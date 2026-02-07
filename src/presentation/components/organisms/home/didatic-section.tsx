"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { RiPlayFill } from "@remixicon/react";
import { Tabs, TabsList, TabsTrigger } from "@/presentation/components/ui/tabs";
import { PrimaryButton } from "@/presentation/components/primary-button";
import { PandaVideoPlayer } from "@/presentation/components/ui/panda-video-player";
import { IDidaticTopic } from "@/common/constants/didatic-topics";

interface IDidaticSectionProps {
  topics: readonly IDidaticTopic[];
}

export const DidaticSection = ({ topics }: IDidaticSectionProps) => {
  const [activeTopic, setActiveTopic] = useState(topics[0]?.id || "");
  const [isAutoRotationActive, setIsAutoRotationActive] = useState(true);
  const activeTopicData = topics.find((topic) => topic.id === activeTopic);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🎯 MÉTODO: Parar rotação automática
  const stopAutoRotation = useCallback(() => {
    setIsAutoRotationActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 🔄 MÉTODO: Gerenciar rotação automática
  const startAutoRotation = useCallback(() => {
    if (!isAutoRotationActive || topics.length <= 1) return;

    // Limpar interval anterior se existir
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setActiveTopic((currentTopic) => {
        const currentIndex = topics.findIndex(
          (topic) => topic.id === currentTopic,
        );
        const nextIndex = (currentIndex + 1) % topics.length;
        return topics[nextIndex].id;
      });
    }, 5000);
  }, [isAutoRotationActive, topics]);

  // 🎯 MÉTODO: Lidar com mudança manual de tópico
  const handleManualTopicChange = useCallback(
    (topicId: string) => {
      stopAutoRotation();
      setActiveTopic(topicId);
    },
    [stopAutoRotation],
  );

  // 🎯 MÉTODO: Lidar com interação no vídeo
  const handleVideoInteraction = useCallback(() => {
    stopAutoRotation();
  }, [stopAutoRotation]);

  // Center active tab in scroll container (mobile only)
  const centerActiveTab = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const activeButton = scrollContainerRef.current.querySelector(
      `[data-state="active"]`,
    ) as HTMLElement;
    if (!activeButton) return;

    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;

    const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, []);

  // 🚀 EFFECT: Iniciar rotação automática
  useEffect(() => {
    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoRotation]);

  // 📱 EFFECT: Centralizar tab no mobile quando tópico mudar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        centerActiveTab();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTopic, centerActiveTab]);

  return (
    <section
      id="didatic"
      className="w-full py-20"
      data-animate-section
      data-animate-children=".animate-child"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Header */}
        <div className="text-center space-y-4 px-2">
          <h2 className="text-white leading-tight animate-child">
            NOSSA DIDÁTICA DESCOMPLICADA
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-normal font-sans leading-relaxed animate-child">
            Selecione um tópico e conheça algumas das nossas aulas:
          </p>
        </div>

        {/* Tabs Grid */}
        <div className="w-full max-w-4xl">
          <Tabs
            value={activeTopic}
            onValueChange={handleManualTopicChange}
            className="w-full"
          >
            {/* Desktop: Grid 2x4 */}
            <div className="hidden lg:block">
              <TabsList className="grid grid-cols-4 gap-2.5 h-auto p-1 bg-transparent mb-2.5">
                {topics.slice(0, 4).map((topic) => (
                  <TabsTrigger
                    key={topic.id}
                    value={topic.id}
                    className="px-4 py-3 rounded-full text-xs font-medium font-sans uppercase transition-all duration-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-indigo-600 hover:bg-indigo-100"
                  >
                    {topic.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="grid grid-cols-4 gap-2.5 h-auto p-1 bg-transparent">
                {topics.slice(4, 8).map((topic) => (
                  <TabsTrigger
                    key={topic.id}
                    value={topic.id}
                    className="px-4 py-3 rounded-full text-xs font-medium font-sans uppercase transition-all duration-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-indigo-600 hover:bg-indigo-100"
                  >
                    {topic.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Mobile/Tablet: Horizontal Scroll */}
            <div
              ref={scrollContainerRef}
              className="lg:hidden overflow-x-auto pb-2 scroll-smooth"
            >
              <TabsList className="flex gap-2.5 h-auto p-1 bg-transparent min-w-max">
                {topics.map((topic) => (
                  <TabsTrigger
                    key={topic.id}
                    value={topic.id}
                    className="shrink-0 px-4 py-3 rounded-full text-xs font-medium font-sans uppercase transition-all duration-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-indigo-600 hover:bg-indigo-100 whitespace-nowrap"
                  >
                    {topic.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Video Content */}
            <div className="mt-8 space-y-8">
              <div className="flex flex-col justify-center items-center px-4">
                {activeTopicData?.videoUrl ? (
                  <PandaVideoPlayer
                    key={activeTopicData.id}
                    src={activeTopicData.videoUrl}
                    poster={activeTopicData.placeholder}
                    className="max-w-[600px]"
                    autoPlay={false}
                    muted={true}
                    controls={true}
                    onPlay={handleVideoInteraction}
                    onPause={handleVideoInteraction}
                    onEnded={handleVideoInteraction}
                  />
                ) : (
                  <div className="w-full aspect-video rounded-2xl bg-black flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <RiPlayFill className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                <p className="text-white text-xl font-normal font-sans leading-relaxed mt-8">
                  E muito mais...
                </p>
              </div>
            </div>
          </Tabs>
        </div>

        {/* CTA Button */}

        <PrimaryButton
          size="lg"
          href="/programas/passaporte-blindado-morar-nos-eua"
          className="uppercase"
        >
          QUERO MUDAR DE VIDA
        </PrimaryButton>
      </div>
    </section>
  );
};
