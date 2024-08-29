import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
  <div className="flex flex-col justify-center items-center text-white h-[45vh] gap-4 px-5 md:px-0 text-sm md:text-base">
    <div className="font-bold md:text-5xl text-2xl flex gap-2 justify-center items-center">Make Cheers<span><img className="relative bottom-2" src="/tea.gif" width={75} alt="" /></span></div>

    <p className="text-center md:text-left">A Crowdfunding platform for creators. Get funded by your fans and followers.</p>

    <div>

<Link href={"/login"}>
    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
</Link>

<Link href={"/about"}>
    <button type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
</Link>
    </div>

  </div>

  <div className="bg-white h-1 opacity-10"></div>


  <div className="text-white container mx-auto pb-32 pt-14 px-10">
    <h1 className="md:text-3xl text-xl font-bold text-center mb-14">Your fans can buy you a cup of Tea.</h1>

    <div className="flex gap-5 justify-around">

      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-0.5 pt-5" width={88} src="/man.gif" alt="" />
        <p className="font-bold text-center">Fans want to help</p>
        <p className="text-center">Your fans are available to help you</p>
      </div>

      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-0.5" width={88} src="/coin.gif" alt="" />
        <p className="font-bold text-center">Fans want to help</p>
        <p className="text-center">Your fans are available to help you</p>
      </div>

      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-400 rounded-full p-0.5" width={98} src="/group.gif" alt="" />
        <p className="font-bold text-center">Fans want to collaborate</p>
        <p className="text-center">Your fans are available to help you</p>
      </div>

    </div>

  </div>


  <div className="bg-white h-1 opacity-10"></div>


  <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
    <h2 className="md:text-3xl text-xl font-bold text-center mb-14">Learn more about us</h2>


    <p className="p-4 text-gray-200 md:text-md text-center font-sans text-sm">
    At Get Me A Chai, we are dedicated to supporting developers, creators, and influencers by connecting them with their supporters. Our platform enables individuals to fund their projects and ideas, providing a space where creativity and innovation can thrive.
            </p>

    <p className="p-4 text-gray-200 md:text-md text-center font-sans text-sm">
    Our mission is to empower talented individuals by facilitating financial support, allowing them to focus on what they do the best. Whether you're a developer coding the next big app, a content creator making engaging videos, or an influencer sharing your passion, Get Me A Chai is here to help you achieve your goals.
            </p>

    <p className="p-4 text-gray-200 md:text-md text-center font-sans text-sm">
    We believe in the power of community and the impact of collective support. By providing a platform for patrons to contribute, we aim to transform dreams into reality and foster a culture of creativity and innovation.
            </p>

<br />
<br />


<div className="flex flex-col justify-center items-center gap-4">


<h2 className="font-bold text-xl underline">Follow me</h2>

            <a href="https://github.com/webd-rupam" target="_blank"><button type="button" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
<svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
</svg>
Github
</button>
</a>

</div>

  </div>
  </>
  );
}
