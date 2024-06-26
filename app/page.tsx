import Image from "next/image";
import APIIMage from "./assets/APIimage.png";

const page = () => {
  return (
    <div className="bg-white w-[100vw] h-[100vh]">
      <main className="flex justify-center items-center flex-row py-20">
        <div className="flex items-start justify-center flex-col w-[40vw] ">
          <h1 className="font-medium text-4xl text-[#1473e6]">
            REST API <br /> BUILD WITH NEXT JS
          </h1>
          <div className="h-1 w-36 mt-6 rounded bg-[#0e9afd]" />
          <p className="mt-9 font-normal text-gray-700">
            Developed a REST API using Next.js and MongoDB with routes for
            users, categories, and blogs, featuring middleware for
            authentication, logging, and error handling. Leveraging Next.js
            serverless API routes and MongoDB for scalable data storage.
          </p>
          <button className="bg-[#0e9afd] text-white rounded-xl px-5 py-2 mt-6 font-bold">
            <a href="https://github.com/kaspra/restapi-nextjs" target="_blank">
              Explore API
            </a>
          </button>
        </div>
        <div className="flex items-center justify-center w-[40vw] py-6">
          <Image src={APIIMage} alt="API_Image" width={500} height={500} />
        </div>
      </main>
    </div>
  );
};

export default page;
