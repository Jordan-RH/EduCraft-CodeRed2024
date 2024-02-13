import Image from "next/image";

function Trash() {
  // Specify the path to your image. This can be a static file, an external URL, or a dynamic source.
  // For static files, place your images in the 'public' folder of your Next.js project.
  const imagePath = "/wip.png"; // Example: '/images/trash.jpg'

  return (
    <div style = {{ display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",paddingTop:"75px"}}>
      {/* Use the Image component with src, width, and height */}
      <Image 
        src={imagePath} 
        alt="Description of the image" // Provide an alt attribute for accessibility.
        width={500} // Specify the width of the image (example value).
        height={400} // Specify the height of the image (example value).
        // Optional: You can also include other props like 'layout', 'priority', etc.
        
      />
      <h2 style={{color:"#82898f"}}> This feature is under construction.</h2>
    </div>
  );
}

export default Trash;
