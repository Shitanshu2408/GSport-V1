import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="py-4 flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className=" text-blue-gray-700 py-2">Sorry, an unexpected error has occurred.</p>
      <p className=" text-blue-gray-700 py-2">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}><button className="p-2 my-2 bg-orange-300 text-white rounded-md">Return to home</button></Link>
      
    </div>
  );
}
