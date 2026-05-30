const listing=require("../models/listing");
const maptilerClient = require('@maptiler/client');
maptilerClient.config.apiKey = process.env.MAP_TOKEN;

module.exports.index=async (req,res)=> {
    const allListings =await  listing.find({});
        res.render("listings/index.ejs",{allListings});
    };

module.exports.renderNewForm=(req,res)=> {
      res.render("listings/new.ejs")
   };

module.exports.showListing=async (req,res)=> {
    let {id}=req.params;
   const specificId=await  listing.findById(id).populate({path:"reviews",populate:{path:"owner"},}).populate("owner");
        if(!specificId) {
            req.flash("error","The Listing you requested does not exist"); 
              return res.redirect("/listings");          
        }
        console.log(specificId);
    res.render("listings/show.ejs",{specificId})
    };

module.exports.createListing=async(req,res,next)=> {
let response = await maptilerClient.geocoding.forward(req.body.listing.location, {
            limit: 1 
        });

        let url= req.file.path;
        const filename=req.file.filename;
        const newListing=new listing(req.body.listing);
         newListing.owner=req.user._id;
         newListing.image={url,filename};

        newListing.geometry = response.features[0].geometry;
       let savedListing= await newListing.save();
       console.log(savedListing);
        req.flash("success","New Listing Created");
        res.redirect("/listings");
   };

module.exports.editListing=async(req,res)=> { 
    let {id}=req.params;
   const editListings= await listing.findById(id);
   if(!editListings) {
     req.flash("error","The Listing you requested does not exist"); 
       return res.redirect("/listings");          
        }
        let originalImageUrl=editListings.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");
   res.render("listings/edit.ejs",{editListings,originalImageUrl})
   };

module.exports.updateListing=async(req,res)=> {
        let {id}=req.params;       
        let response = await maptilerClient.geocoding.forward(req.body.listing.location, {
        limit: 1 
    });

      let editListing= await listing.findByIdAndUpdate(id,{...req.body.listing});

       editListing.geometry = response.features[0].geometry;

      if(typeof req.file != "undefined") {
       let url= req.file.path;
        const filename=req.file.filename;
        editListing.image={url,filename};

      }
      await editListing.save();
       req.flash("success","Listing Updated");
        res.redirect(`/listings/${id}`);
    };

module.exports.deleteListing=async(req,res)=> {
        let {id}=req.params;
      let deletedList= await listing.findByIdAndDelete(id);
      console.log(deletedList);
      req.flash("success","Listing Deleted");
      res.redirect("/listings");
    };

module.exports.searchListings = async (req, res) => {
    const q = req.query.q?.trim();

    if (!q) return res.redirect("/listings");

    const regex = new RegExp(q, "i");

    // Find all matching listings
    const allListings = await listing.find({
        $or: [
            { title: regex },
            { location: regex },
            { country: regex },
            { description: regex },
        ],
    });

    // Case 1: No listings found
    if (allListings.length === 0) {
        req.flash("error", `No listings found for "${q}"`);
        return res.redirect("/listings");
    }

    // Case 2: Exactly one match found -> Open its show page directly!
    if (allListings.length === 1) {
        return res.redirect(`/listings/${allListings[0]._id}`);
    }

    // Case 3: Multiple listings found (Optional Fallback)
    // Send them to the first match but alert them that more matches exist via a flash
    req.flash("success", `Showing closest match for "${q}". (Found ${allListings.length} results)`);
    return res.redirect(`/listings/${allListings[0]._id}`);
};