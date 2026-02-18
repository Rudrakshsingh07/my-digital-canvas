import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Laptop, Smartphone, Tablet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import projectsData from "@/data/projects.json";

import iphoneFrame from "@/assets/devices/iphone.png";
import ipadFrame from "@/assets/devices/ipad.png";
import macbookFrame from "@/assets/devices/macbook.png";

type DeviceType = "iphone" | "ipad" | "macbook";
type ProjectType = "website" | "mobile" | "backend" | "desktop" | "python";

type DeviceMedia = { video: string; poster: string };
type Project = {
  id: string;
  title: string;
  type: ProjectType;
  allowedDevices: DeviceType[];
  media: Partial<Record<DeviceType, DeviceMedia>>;
};

const DEVICES: { key: DeviceType; Icon: typeof Laptop }[] = [
  { key: "iphone", Icon: Smartphone },
  { key: "ipad", Icon: Tablet },
  { key: "macbook", Icon: Laptop },
];

const DEVICE_FRAMES: Record<DeviceType, string> = {
  iphone: iphoneFrame,
  ipad: ipadFrame,
  macbook: macbookFrame,
};

// Screen inset percentages for each device frame image (iPad Air, iPhone, MacBook Pro 14")
// These define where the video sits inside the frame image to match inner screen borders
const DEVICE_SCREEN_INSETS: Record<DeviceType, { top: string; left: string; right: string; bottom: string }> = {
  iphone: { top: "2%", left: "4.9%", right: "4.9%", bottom: "2%" },
  ipad: { top: "19%", left: "4.2%", right: "4.2%", bottom: "19%" },
  macbook: { top: "2.3%", left: "9.2%", right: "9.2%", bottom: "11%" },
};

const DEVICE_MAX_WIDTH: Record<DeviceType, string> = {
  iphone: "max-w-[260px] md:max-w-[300px]",
  ipad: "max-w-[500px] md:max-w-[580px]",
  macbook: "max-w-[700px] md:max-w-[820px]",
};

const getDefaultDevice = (p: Project): DeviceType => {
  if (p.type === "mobile") return p.allowedDevices.includes("iphone") ? "iphone" : "ipad";
  if (["backend", "desktop", "python"].includes(p.type)) return "macbook";
  return p.allowedDevices.includes("macbook") ? "macbook" : p.allowedDevices[0] ?? "macbook";
};

const ProjectsShowcase = () => {
  const navigate = useNavigate();
  const projects = useMemo<Project[]>(() => projectsData as Project[], []);

  const [activeId, setActiveId] = useState(() => projects[0]?.id ?? "");
  const [activeDevice, setActiveDevice] = useState<DeviceType>(() =>
    projects[0] ? getDefaultDevice(projects[0]) : "macbook"
  );
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0];

  useEffect(() => {
    if (!activeProject) return;
    if (!activeProject.allowedDevices.includes(activeDevice)) {
      setActiveDevice(getDefaultDevice(activeProject));
    }
  }, [activeProject, activeDevice]);

  useEffect(() => {
    if (!activeProject) return;
    const media = activeProject.media[activeDevice];
    if (!media) return;

    setVideoReady(false);
    const video = videoRef.current;
    if (video) {
      video.src = media.video;
      video.poster = media.poster;
      video.load();
      video.play().catch(() => {});
    }
  }, [activeProject, activeDevice]);

  const selectProject = useCallback((p: Project) => {
    setActiveId(p.id);
    setActiveDevice(getDefaultDevice(p));
  }, []);

  const preloadProject = useCallback((p: Project) => {
    const dev = getDefaultDevice(p);
    const media = p.media[dev];
    if (!media) return;
    const v = document.createElement("video");
    v.preload = "metadata";
    v.src = media.video;
  }, []);

  const media = activeProject?.media[activeDevice];
  const insets = DEVICE_SCREEN_INSETS[activeDevice];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 led-grid opacity-[0.05]" />
        <div className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="absolute -right-32 bottom-10 w-[400px] h-[400px] rounded-full bg-indigo/[0.08] blur-[100px]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top bar */}
        <motion.header
          className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 md:py-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Projects Studio
          </p>

          {/* Device pills — icons only */}
          <div className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/70 backdrop-blur-sm px-1.5 py-1">
            {DEVICES.map(({ key, Icon }) => {
              const enabled = activeProject?.allowedDevices.includes(key) ?? false;
              const isActive = activeDevice === key;
              return (
                <button
                  key={key}
                  onClick={() => enabled && setActiveDevice(key)}
                  disabled={!enabled}
                  className={`inline-flex items-center justify-center rounded-full w-8 h-8 transition-smooth ${
                    !enabled
                      ? "opacity-25 cursor-not-allowed"
                      : isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/60"
                  }`}
                  title={key}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </motion.header>

        {/* Main content */}
        <div className="flex-1 flex flex-col-reverse lg:flex-row gap-6 lg:gap-0 px-6 md:px-12 lg:px-20 pb-10 md:pb-16">
          {/* LEFT — Selector (35%) */}
          <motion.aside
            className="w-full lg:w-[35%] lg:pr-10 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="space-y-1">
              {projects.map((project, i) => {
                const isActive = project.id === activeId;
                return (
                  <motion.button
                    key={project.id}
                    type="button"
                    onClick={() => selectProject(project)}
                    onMouseEnter={() => preloadProject(project)}
                    className={`w-full text-left px-5 py-4 md:py-5 rounded-xl transition-smooth group ${
                      isActive
                        ? "bg-card/80 border border-accent/20 shadow-soft"
                        : "border border-transparent hover:bg-card/40"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    tabIndex={0}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-block w-1.5 h-1.5 rounded-full transition-smooth ${
                              isActive ? "bg-accent" : "bg-muted-foreground/30"
                            }`}
                          />
                          <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                            {project.type}
                          </p>
                        </div>
                        <p
                          className={`text-base md:text-lg font-heading transition-smooth ${
                            isActive ? "text-foreground" : "text-foreground/60 group-hover:text-foreground/80"
                          }`}
                        >
                          {project.title}
                        </p>
                        {isActive && (
                          <motion.div
                            className="flex items-center gap-1.5 pt-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                          >
                            {project.allowedDevices.map((d) => {
                              const dev = DEVICES.find((dd) => dd.key === d);
                              if (!dev) return null;
                              return (
                                <span
                                  key={d}
                                  className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border/50 text-muted-foreground"
                                >
                                  <dev.Icon className="w-3 h-3" />
                                </span>
                              );
                            })}
                          </motion.div>
                        )}
                      </div>
                      <span
                        className={`text-xs tabular-nums pt-1 transition-smooth ${
                          isActive ? "text-accent" : "text-muted-foreground/40"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.p
              className="mt-8 text-xs text-muted-foreground/60 leading-relaxed max-w-sm px-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Select a project to see its motion capture. Each showcase adapts
              to its native device — videos load on demand for performance.
            </motion.p>
          </motion.aside>

          {/* RIGHT — Device preview (65%) */}
          <motion.section
            className="w-full lg:w-[65%] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative w-full flex items-center justify-center py-8 md:py-0">
              {/* Glow behind device */}
              <div className="absolute w-3/4 h-3/4 rounded-full bg-accent/[0.04] blur-[80px]" />

              {/* Device frame using actual images */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDevice}
                  className={`relative mx-auto ${DEVICE_MAX_WIDTH[activeDevice]}`}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Frame image */}
                  <img
                    src={DEVICE_FRAMES[activeDevice]}
                    alt={`${activeDevice} frame`}
                    className="relative z-10 w-full h-auto pointer-events-none select-none"
                    draggable={false}
                  />

                  {/* Video placed behind frame, clipped to screen area */}
                  <div
                    className="absolute z-0 overflow-hidden"
                    style={{
                      top: insets.top,
                      left: insets.left,
                      right: insets.right,
                      bottom: insets.bottom,
                      borderRadius: activeDevice === "iphone" ? "6%" : activeDevice === "ipad" ? "2.5%" : "1%",
                    }}
                  >
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={media?.poster}
                      onCanPlay={() => setVideoReady(true)}
                    >
                      {media && <source src={media.video} type="video/mp4" />}
                    </video>

                    {/* Loading state */}
                    {!videoReady && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            className="w-8 h-8 rounded-full border-2 border-accent/40 border-t-accent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground/60">
                            Loading capture
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </div>

        {/* Footer info */}
        <motion.footer
          className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between text-[0.6rem] md:text-xs tracking-[0.2em] uppercase text-muted-foreground/50 border-t border-border/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>{activeProject?.title}</span>
          <span>{activeProject?.type}</span>
        </motion.footer>
      </div>
    </main>
  );
};

export default ProjectsShowcase;
