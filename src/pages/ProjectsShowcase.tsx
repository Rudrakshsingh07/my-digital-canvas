import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import projectsData from "@/data/projects.json";

type DeviceType = "iphone" | "ipad" | "macbook";

type ProjectType = "website" | "mobile" | "backend" | "desktop" | "python";

type DeviceMedia = {
  video: string;
  poster: string;
};

type Project = {
  id: string;
  title: string;
  type: ProjectType;
  allowedDevices: DeviceType[];
  media: Partial<Record<DeviceType, DeviceMedia>>;
};

const DEVICE_LABELS: Record<DeviceType, string> = {
  iphone: "iPhone",
  ipad: "iPad",
  macbook: "MacBook",
};

const DEVICE_ICONS: Record<DeviceType, typeof Laptop> = {
  iphone: Smartphone,
  ipad: Tablet,
  macbook: Laptop,
};

const getDefaultDeviceForProject = (project: Project): DeviceType => {
  if (project.type === "mobile") return project.allowedDevices.includes("iphone") ? "iphone" : "ipad";
  if (project.type === "backend" || project.type === "desktop" || project.type === "python") {
    return "macbook";
  }
  // website / other → prefer MacBook if available, otherwise first allowed
  if (project.allowedDevices.includes("macbook")) return "macbook";
  return project.allowedDevices[0] ?? "macbook";
};

const ProjectsShowcase = () => {
  const projects = useMemo<Project[]>(
    () => projectsData as Project[],
    []
  );

  const [activeProjectId, setActiveProjectId] = useState(() => projects[0]?.id ?? "");
  const [activeDevice, setActiveDevice] = useState<DeviceType>(() =>
    projects[0] ? getDefaultDeviceForProject(projects[0]) : "macbook"
  );
  const [hasEngaged, setHasEngaged] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [currentPoster, setCurrentPoster] = useState<string | undefined>(undefined);

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? projects[0];

  // Ensure device is always valid for the active project
  useEffect(() => {
    if (!activeProject) return;

    if (!activeProject.allowedDevices.includes(activeDevice)) {
      setActiveDevice(getDefaultDeviceForProject(activeProject));
    }
  }, [activeProject, activeDevice]);

  // Lazily start loading the first video only after the page is mounted
  useEffect(() => {
    setHasEngaged(true);
  }, []);

  // Update video source whenever project/device changes
  useEffect(() => {
    if (!hasEngaged || !activeProject) return;

    const media = activeProject.media[activeDevice];
    if (!media) return;

    const nextSrc = media.video;
    const nextPoster = media.poster;

    setCurrentPoster(nextPoster);

    if (currentSrc === nextSrc) return;

    setCurrentSrc(nextSrc);

    const video = videoRef.current;
    if (video) {
      video.load();
      const playPromise = video.play();
      if (playPromise instanceof Promise) {
        playPromise.catch(() => {
          // Autoplay might be blocked; that's fine since controls are visible.
        });
      }
    }
  }, [activeProject, activeDevice, hasEngaged, currentSrc]);

  const handleSelectProject = (project: Project) => {
    setActiveProjectId(project.id);
    const defaultDevice = getDefaultDeviceForProject(project);
    setActiveDevice(defaultDevice);
  };

  const handleDeviceChange = (device: DeviceType) => {
    if (!activeProject) return;
    if (!activeProject.allowedDevices.includes(device)) return;
    setActiveDevice(device);
  };

  const handleProjectHoverPreload = (project: Project) => {
    const defaultDevice = getDefaultDeviceForProject(project);
    const media = project.media[defaultDevice];
    if (!media) return;

    // Lightweight hover preload: hint the browser to fetch video metadata.
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = media.video;
  };

  const isDeviceEnabledForProject = (project: Project, device: DeviceType) =>
    project.allowedDevices.includes(device);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-screen px-6 md:px-12 lg:px-24 py-24 md:py-28 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 led-grid opacity-[0.08]" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-accent/10" />
        <div className="absolute -left-40 top-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute right-[-6rem] bottom-[-4rem] w-96 h-96 rounded-full bg-indigo/15 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">
          {/* Page header */}
          <div className="flex flex-col gap-4 md:gap-6 max-w-3xl">
            <motion.p
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Projects Studio
            </motion.p>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              An immersive space for{" "}
              <span className="text-gold italic">interfaces, motion, and systems</span>.
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-foreground/70 max-w-2xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Each project is framed inside a dedicated device, using curated motion captures
              instead of live previews. Optimized for GitHub Pages, but designed to feel like
              a product film.
            </motion.p>
          </div>

          {/* Split layout */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            {/* Project selector */}
            <motion.aside
              className="w-full lg:w-[35%] space-y-6"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-muted-foreground">
                  Project timeline
                </p>
                <span className="text-xs text-muted-foreground/80">
                  Use ↑ ↓ or click to explore
                </span>
              </div>

              <div
                className="relative rounded-2xl border border-border/70 bg-card/80 backdrop-blur-xl shadow-card overflow-hidden"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (!["ArrowUp", "ArrowDown", "Enter", " "].includes(event.key)) return;

                  event.preventDefault();
                  const index = projects.findIndex((p) => p.id === activeProjectId);
                  if (event.key === "ArrowDown") {
                    const next = (index + 1) % projects.length;
                    handleSelectProject(projects[next]);
                  } else if (event.key === "ArrowUp") {
                    const prev = (index - 1 + projects.length) % projects.length;
                    handleSelectProject(projects[prev]);
                  } else if (event.key === "Enter" || event.key === " ") {
                    // Re-trigger to ensure device defaults are respected
                    if (activeProject) handleSelectProject(activeProject);
                  }
                }}
              >
                <div className="max-h-[420px] md:max-h-[480px] overflow-y-auto custom-scrollbar">
                  <AnimatePresence initial={false}>
                    {projects.map((project) => {
                      const isActive = project.id === activeProjectId;
                      return (
                        <motion.button
                          key={project.id}
                          type="button"
                          onClick={() => handleSelectProject(project)}
                          onMouseEnter={() => handleProjectHoverPreload(project)}
                          className={`w-full text-left px-5 md:px-6 py-4 md:py-5 border-b border-border/40 last:border-b-0 transition-smooth ${
                            isActive ? "bg-accent/5" : "bg-transparent hover:bg-muted/40"
                          }`}
                          initial={false}
                          animate={{ backgroundColor: isActive ? "hsla(12,70%,55%,0.05)" : "transparent" }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                {project.type}
                              </p>
                              <p className="text-base md:text-lg font-heading text-foreground">
                                {project.title}
                              </p>
                            </div>
                            <motion.span
                              className="h-8 w-8 rounded-full border border-border/70 flex items-center justify-center text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground"
                              initial={false}
                              animate={{
                                scale: isActive ? 1.05 : 1,
                                opacity: isActive ? 1 : 0.85,
                              }}
                            >
                              {projects.indexOf(project) + 1}
                            </motion.span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                Each card routes into a tailored device setup and motion capture. No full-page
                navigation — just a continuous spatial shift inside this studio view.
              </p>
            </motion.aside>

            {/* Device preview area */}
            <motion.section
              className="w-full lg:w-[65%]"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Device selector */}
              <div className="mb-5 md:mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Device-aware playback</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-card/80 border border-border/70 px-1.5 py-1">
                  {(Object.keys(DEVICE_LABELS) as DeviceType[]).map((device) => {
                    const Icon = DEVICE_ICONS[device];
                    const enabled = activeProject
                      ? isDeviceEnabledForProject(activeProject, device)
                      : false;
                    const isActive = activeDevice === device;

                    return (
                      <button
                        key={device}
                        type="button"
                        onClick={() => handleDeviceChange(device)}
                        disabled={!enabled}
                        className={`relative inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs transition-smooth ${
                          !enabled
                            ? "opacity-30 cursor-not-allowed"
                            : isActive
                            ? "bg-accent text-background shadow-sm"
                            : "text-muted-foreground hover:bg-muted/70"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{DEVICE_LABELS[device]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Device frame + video */}
              <div className="relative w-full">
                <div className="relative w-full rounded-[2.25rem] border border-border/70 bg-card/90 shadow-glow backdrop-blur-xl overflow-hidden">
                  {/* Bezel */}
                  <div className="px-3 pt-3 pb-2 md:px-4 md:pt-4 md:pb-3 flex items-center justify-between text-[0.6rem] md:text-xs text-muted-foreground/70">
                    <span>{activeProject?.title}</span>
                    <span>{DEVICE_LABELS[activeDevice]}</span>
                  </div>

                  {/* Screen */}
                  <div className="relative px-3 pb-3 md:px-4 md:pb-4">
                    <div className="relative rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden bg-black/90 border border-border/60">
                      <div className="aspect-[16/9] md:aspect-[16/9] w-full">
                        {currentPoster && !currentSrc && (
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${currentPoster})` }}
                          />
                        )}

                        <AnimatePresence>
                          {currentSrc && (
                            <motion.video
                              key={currentSrc}
                              ref={videoRef}
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                              poster={currentPoster}
                              initial={{ opacity: 0.0, scale: 1.02 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 1.01 }}
                              transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                              <source src={currentSrc} type="video/mp4" />
                            </motion.video>
                          )}
                        </AnimatePresence>

                        {!currentSrc && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-3 text-xs md:text-sm text-muted-foreground/80">
                              <span className="w-7 h-7 rounded-full border border-border/70 flex items-center justify-center">
                                ●
                              </span>
                              <p className="max-w-xs text-center">
                                Showcase video will appear here when media is added for this device.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting copy */}
              <div className="mt-5 md:mt-6 flex flex-col md:flex-row gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground/80">
                <p className="max-w-sm">
                  Device availability follows the project:{" "}
                  <span className="font-medium text-foreground/90">
                    mobile → iPhone / iPad · backend & Python → MacBook only · web → all devices
                  </span>
                  . The player always chooses the most appropriate frame.
                </p>
                <p className="max-w-sm">
                  All motion is captured as video for performance on GitHub Pages. Only the active
                  project and device stream are ever loaded, with hover preloading as a hint.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsShowcase;

