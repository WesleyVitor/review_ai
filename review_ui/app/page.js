
import Aside from "./Components/Aside/Aside";
import Main from "./Components/Main/Main";


export default function Page() {
  return (
    <div className="h-screen flex">
      <Aside/>
      <Main/>
    </div>
  );
}