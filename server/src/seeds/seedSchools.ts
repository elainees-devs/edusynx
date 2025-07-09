import SchoolModel from "../models/school.model";

export async function seedSchools() {
    try {
        // Import the sample schools data
        const { seedSchoolData } = await import("./seedSchoolData");
    
        // // Log the deletion of existing schools
        // console.log("Deleting all schools...");
        await SchoolModel.deleteMany({});
    
        // Log the seeding of new schools
        console.log("Seeding schools...");
        await SchoolModel.insertMany(seedSchoolData);


    
        // Log the completion of the seeding process
        console.log("Seeding complete.");

           console.log("Updating or inserting schools...");

    for (const school of seedSchoolData) {
      await SchoolModel.updateOne(
        { _id: school._id },         // Match by _id (or use unique field like `schoolCode`)
        { $set: school },            // Set the entire school object
        { upsert: true }             // Insert if not exists, update if exists
      );
    }
    } catch (err) {
        console.error("Seeding error:", err);
    }   

    
    
}