// import React from "react";


// function Download({ availDownloads, title, availQuality }) {
//   if (!availQuality || !availDownloads) {
//     return <div>Loading...</div>; // or any placeholder UI
//   }

//   return (
//     <div>
//       <section className="text-gray-400 bg-gray-900 body-font">
//       <div className="container px-5 pt-20 mx-auto">
//           <div className="text-center mb-20">
//             <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">
//               -- Download Links --
//             </h1>
//             <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
//               Blue bottle crucifix vinyl post-ironic four dollar toast vegan
//               taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh
//               mi pug.
//             </p>
//           </div>

//           <div className="flex flex-wrap lg:w-full sm:mx-auto sm:mb-2 -mx-2">
//             {availQuality.map((quality, i) => (
//               <div key={i} className="p-2 sm:w-1/2 w-full">
//                 <div className="bg-indigo-800 hover:bg-indigo-700 rounded flex p-4 h-full items-center cursor-pointer">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 2 24 22"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     className="text-indigo-300 hover:bg-indigo-600 w-6 h-6 flex mr-4 mt-auto"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M14 3v10m0 0l-4-4m4 4l4-4M8 17h8m2 0h1m-10 4h8m2-5h1"
//                     />
//                   </svg>

//                   <a href={availDownloads[i]}>
//                     <span className="title-font font-medium text-white">
//                       {title} - {quality}p
//                     </span>
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Download;
