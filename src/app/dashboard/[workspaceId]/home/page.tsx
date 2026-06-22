import { Sparkles, Video, Upload, FolderOpen, ArrowRight } from "lucide-react";

const Home = async () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-[#252525] bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-black p-10">
        <div className="absolute top-0 right-0 h-72 w-72 bg-violet-600/10 blur-[120px]" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-violet-500" size={18} />
            <span className="text-violet-400 font-medium">
              Welcome Back
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Every recording
            <span className="text-violet-500"> tells a story.</span>
          </h1>

          <p className="mt-5 text-lg text-zinc-400 max-w-2xl">
            Capture your screen, explain your ideas, share knowledge,
            and let AI handle the note-taking. Everything you need
            for modern video collaboration lives inside Vync.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-violet-600 hover:bg-violet-500 transition-all px-6 py-3 rounded-xl text-white font-medium flex items-center gap-2">
              Start Recording
              <ArrowRight size={18} />
            </button>

            <button className="border border-zinc-700 hover:border-zinc-500 transition-all px-6 py-3 rounded-xl text-white">
              Upload Video
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-white text-2xl font-semibold mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#111111] border border-[#252525] rounded-2xl p-6 hover:border-violet-500/40 transition-all cursor-pointer">
            <Video className="text-violet-500 mb-4" size={28} />
            <h3 className="text-white font-semibold text-lg">
              Record Video
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Capture your screen, camera and microphone instantly.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#252525] rounded-2xl p-6 hover:border-violet-500/40 transition-all cursor-pointer">
            <Upload className="text-violet-500 mb-4" size={28} />
            <h3 className="text-white font-semibold text-lg">
              Upload Content
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Upload recordings and manage them from one place.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#252525] rounded-2xl p-6 hover:border-violet-500/40 transition-all cursor-pointer">
            <FolderOpen className="text-violet-500 mb-4" size={28} />
            <h3 className="text-white font-semibold text-lg">
              Organize Videos
            </h3>
            <p className="text-zinc-400 mt-2 text-sm">
              Create folders and keep your workspace organized.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#111111] border border-[#252525] rounded-3xl p-8">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Why Vync?
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-zinc-300">
            ✓ Record screen and audio
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            ✓ Instant video sharing
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            ✓ AI-powered summaries
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            ✓ Folder organization
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            ✓ Workspace collaboration
          </div>

          <div className="flex items-center gap-3 text-zinc-300">
            ✓ Secure cloud storage
          </div>
        </div>
      </div>

      {/* Motivation Card */}
      <div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-8">
        <p className="text-violet-400 font-medium mb-2">
          Today's Reminder
        </p>

        <h3 className="text-2xl text-white font-semibold">
          Great communication scales great teams.
        </h3>

        <p className="text-zinc-400 mt-3">
          Record once, share everywhere, and let Vync keep everyone
          aligned.
        </p>
      </div>
    </div>
  );
};

export default Home;