import { useEffect, useRef, useState } from 'react';

const projects = [
  'Flows',
  'Kakimasu',
  'Stack',
  'Voicenotes',
  'WorkFeed',
  'Switch UI',
  'Aurora Retreat',
];

const projectDimensions = {
  Flows: { width: 834 },
  Kakimasu: { width: 312 },
  Stack: { width: 312 },
  Voicenotes: { width: 312 },
  WorkFeed: { width: 1033 },
  'Switch UI': { width: 824 },
  'Aurora Retreat': { width: 1033 },
};

const projectMobileLayouts = {
  Flows: { mobileWidth: 360, mobileScale: 1 },
  Kakimasu: { mobileWidth: 360, mobileScale: 1 },
  Stack: { mobileWidth: 360, mobileScale: 1 },
  Voicenotes: { mobileWidth: 360, mobileScale: 1 },
  WorkFeed: { mobileWidth: 360, mobileScale: 1 },
  'Switch UI': { mobileWidth: 360, mobileScale: 1 },
  'Aurora Retreat': { mobileWidth: 360, mobileScale: 1 },
};

export default function App() {
  const SLIDE_DURATION = 600;
  const TAG_DELAY = 50;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const [showTag, setShowTag] = useState(true);
  const [pressedIndex, setPressedIndex] = useState(null);
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const tagTimeoutRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchCurrentXRef = useRef(null);
  const [sidePadding, setSidePadding] = useState({ left: 20, right: 20 });
  const [isMobile, setIsMobile] = useState(false);
  const [desktopStageHeight, setDesktopStageHeight] = useState(null);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  const calculateSidePadding = () => {
    const carousel = carouselRef.current;
    const items = itemRefs.current;

    if (!carousel || !items.length) return;

    const halfViewport = carousel.clientWidth / 2;
    const firstHalf = items[0]?.offsetWidth / 2 || 0;
    const lastHalf = items[items.length - 1]?.offsetWidth / 2 || 0;

    setSidePadding({
      left: Math.max(halfViewport - firstHalf, 20),
      right: Math.max(halfViewport - lastHalf, 20),
    });
  };

  const centerSelected = (index) => {
    const carousel = carouselRef.current;
    const target = itemRefs.current[index];

    if (!carousel || !target) return;

    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    const desiredScroll = targetCenter - carousel.clientWidth / 2;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const clampedScroll = Math.min(Math.max(desiredScroll, 0), maxScroll);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const start = carousel.scrollLeft;
    const change = clampedScroll - start;
    const duration = 500;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      carousel.scrollLeft = start + change * easedProgress;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    centerSelected(selectedIndex);
  }, [selectedIndex]);

  const updateDesktopStageHeight = (navHeightValue, carouselHeightValue) => {
    if (isMobile) return;

    const navHeight = navHeightValue ?? navRef.current?.offsetHeight ?? 0;
    const carouselHeight =
      (carouselHeightValue ?? carouselRef.current?.offsetHeight ?? 0) || 0;
    const viewportHeight = window.innerHeight || 0;
    const paddingTop = navHeight + 8;
    const paddingBottom = 28;
    const stackGap = 8;
    const safetyReturn = 8;
    const availableHeight = viewportHeight - paddingTop - paddingBottom - stackGap - carouselHeight + safetyReturn;
    const baselineHeight = availableHeight > 420
      ? Math.min(availableHeight, 720)
      : availableHeight;
    const clampedHeight = Math.max(320, baselineHeight);

    setDesktopStageHeight(clampedHeight);
  };

  const updateNavHeight = () => {
    const navMeasuredHeight = navRef.current?.offsetHeight || 0;
    setNavHeight(navMeasuredHeight);
    return navMeasuredHeight;
  };

  useEffect(() => {
    calculateSidePadding();
    centerSelected(selectedIndex);

    const handleResize = () => {
      calculateSidePadding();
      centerSelected(selectedIndex);
      const measuredNavHeight = updateNavHeight();
      const measuredCarouselHeight = carouselRef.current?.offsetHeight || 0;
      updateDesktopStageHeight(measuredNavHeight, measuredCarouselHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedIndex, isMobile]);

  useEffect(() => {
    const measuredNavHeight = updateNavHeight();
    const measuredCarouselHeight = carouselRef.current?.offsetHeight || 0;

    if (!isMobile) {
      updateDesktopStageHeight(measuredNavHeight, measuredCarouselHeight);
    }
  }, [isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }

      if (tagTimeoutRef.current) {
        clearTimeout(tagTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return undefined;

    const handleWheel = (event) => {
      const delta = event.deltaY || event.deltaX;

      if (!delta) return;

      event.preventDefault();
      carousel.scrollLeft += delta;
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener('wheel', handleWheel, { passive: false });
    };
  }, []);

  const handleSelectProject = (index) => {
    if (index === selectedIndex) return;

    setTransitionDirection(index > selectedIndex ? 1 : -1);
    setExitingIndex(selectedIndex);
    setSelectedIndex(index);
    setShowTag(false);

    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current);
    }

    if (tagTimeoutRef.current) {
      clearTimeout(tagTimeoutRef.current);
    }

    exitTimeoutRef.current = setTimeout(() => {
      setExitingIndex(null);
    }, SLIDE_DURATION);

    tagTimeoutRef.current = setTimeout(() => {
      setShowTag(true);
    }, SLIDE_DURATION + TAG_DELAY);
  };

  const handleTouchStart = (event) => {
    if (event.touches.length !== 1) return;

    const { clientX } = event.touches[0];
    touchStartXRef.current = clientX;
    touchCurrentXRef.current = clientX;
  };

  const handleTouchMove = (event) => {
    if (!touchStartXRef.current) return;

    touchCurrentXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || touchCurrentXRef.current === null) return;

    const deltaX = touchCurrentXRef.current - touchStartXRef.current;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0 && selectedIndex < projects.length - 1) {
        handleSelectProject(selectedIndex + 1);
      } else if (deltaX > 0 && selectedIndex > 0) {
        handleSelectProject(selectedIndex - 1);
      }
    }

    touchStartXRef.current = null;
    touchCurrentXRef.current = null;
  };

  const renderFrame = (projectName, transitionClass, tagVisible, frameKey) => {
    const baseWidth = projectDimensions[projectName]?.width || 834;
    const overrides = projectMobileLayouts[projectName] || {};
    const mobileScale = isMobile ? overrides.mobileScale ?? 1 : 1;
    const mobileWidth = isMobile ? overrides.mobileWidth : undefined;
    const desktopBottomPadding =
      !isMobile && ['Kakimasu', 'Stack', 'Voicenotes'].includes(projectName)
        ? '2px'
        : undefined;

    return (
      <div key={frameKey || projectName} className={`project-frame ${transitionClass}`}>
        <div
          className="project-content-wrapper"
          style={{
            '--project-base-width': baseWidth,
            '--project-mobile-scale': mobileScale,
            ...(mobileWidth ? { '--project-mobile-width': `${mobileWidth}px` } : {}),
            ...(desktopBottomPadding ? { paddingBottom: desktopBottomPadding } : {}),
          }}
        >
          {renderProjectContent(projectName, { showTag: tagVisible, isMobile })}
        </div>
      </div>
    );
  };

  const containerClassName = `app-container${isMobile ? ' mobile-layout' : ''}`;
  const navClassName = isMobile ? 'mobile-nav' : '';

  const pageControls = (
    <div className="mobile-page-controls">
      {projects.map((project, index) => (
        <button
          key={project}
          type="button"
          className={`mobile-page-control-button${
            index === selectedIndex ? ' active' : ''
          }`}
          aria-label={`Go to ${project}`}
          onClick={() => handleSelectProject(index)}
        />
      ))}
    </div>
  );

  return (
    <div
      className={containerClassName}
      style={
        isMobile
          ? {
              '--mobile-nav-height': `${navHeight}px`,
              overflow: 'hidden',
              position: 'relative',
            }
          : {
              backgroundColor: '#FFFFFF',
              height: '100vh',
              minHeight: '100vh',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }
      }
    >
      <nav
        ref={navRef}
        className={navClassName}
        style={
          isMobile
            ? undefined
            : {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                alignItems: 'start',
                boxSizing: 'border-box',
                contain: 'layout',
                display: 'flex',
                flexDirection: 'column',
                fontSynthesis: 'none',
                gap: '8px',
                height: 'fit-content',
                justifyContent: 'center',
                MozOsxFontSmoothing: 'grayscale',
                paddingBottom: '0px',
                paddingLeft: '32px',
                paddingRight: '20px',
                paddingTop: '20px',
                WebkitFontSmoothing: 'antialiased',
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                zIndex: 10,
              }
        }
      >
        <div
          style={{
            alignItems: 'start',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: '0',
            height: 'fit-content',
            justifyContent: 'start',
            width: 'fit-content',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#000000',
              flexShrink: '0',
              fontFamily: '"Google Sans Flex", system-ui, sans-serif',
              fontSize: '20px',
              fontVariationSettings:
                '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
              fontWeight: 400,
              height: 'fit-content',
              lineHeight: '140%',
              whiteSpace: 'pre',
              width: 'fit-content',
            }}
          >
            Toni Nađ
          </div>
        </div>
        <div
          style={{
            alignItems: 'center',
            borderRadius: '0px',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: '12px',
            height: 'fit-content',
            justifyContent: 'start',
            paddingBlock: '0px',
            paddingInline: '0px',
            width: 'fit-content',
          }}
        >
          <a
            href="mailto:toni@nad.com"
            style={{
              alignItems: 'center',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'row',
              flexShrink: '0',
              height: '24px',
              justifyContent: 'center',
              width: '24px',
            }}
          >
            <div
              style={{
                backgroundImage:
                  'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXS3K8VTA6TT7AJYZJSDA0F.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                boxSizing: 'border-box',
                flexShrink: '0',
                height: '19px',
                opacity: '10%',
                width: '19px',
              }}
            />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXS4XGXBVXT4CK0NG024Y15.svg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '24px',
              opacity: '10%',
              width: '24px',
            }}
          />
        </div>
      </nav>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: '8px',
          width: '100%',
          flex: '1 1 auto',
          paddingInline: isMobile ? '0' : '20px',
          paddingBottom: isMobile ? '0' : '28px',
          paddingTop: isMobile ? '0' : `${(navHeight || 0) + 8}px`,
          boxSizing: 'border-box',
        }}
      >
        <div
          className={`project-stage ${isMobile ? 'mobile-stage' : ''}`}
          style={{
            height: isMobile ? undefined : desktopStageHeight || undefined,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {exitingIndex !== null && (
            renderFrame(
              projects[exitingIndex],
              transitionDirection === 1 ? 'exit-to-left' : 'exit-to-right',
              false,
              `${projects[exitingIndex]}-exit`
            )
          )}
          {renderFrame(
            projects[selectedIndex],
            transitionDirection === 1 ? 'enter-from-right' : 'enter-from-left',
            showTag,
            projects[selectedIndex]
          )}
        </div>

        {!isMobile && (
          <div
            ref={carouselRef}
            className="project-carousel"
            style={{
              alignItems: 'center',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'row',
              fontSynthesis: 'none',
              gap: '40px',
              height: 'fit-content',
              justifyContent: 'start',
              MozOsxFontSmoothing: 'grayscale',
              paddingBlock: '20px',
              paddingInline: `${sidePadding.left}px ${sidePadding.right}px`,
              WebkitFontSmoothing: 'antialiased',
              width: '100%',
              overflowX: 'auto',
            }}
          >
            {projects.map((project, index) => (
              <button
                key={project}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                onClick={() => handleSelectProject(index)}
                onMouseDown={() => setPressedIndex(index)}
                onMouseUp={() => setPressedIndex(null)}
                onMouseLeave={() => setPressedIndex(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  boxSizing: 'border-box',
                  color: selectedIndex === index ? '#000000' : '#C4C4C4',
                  flexShrink: 0,
                  fontFamily: '"Google Sans Flex", system-ui, sans-serif',
                  fontSize: '20px',
                  fontVariationSettings:
                    '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
                  fontWeight: 400,
                  lineHeight: '140%',
                  whiteSpace: 'pre',
                  width: 'fit-content',
                  cursor: 'pointer',
                  transition: 'color 150ms ease, transform 120ms ease',
                  transform: pressedIndex === index ? 'scale(0.94)' : 'scale(1)',
                }}
              >
                {project}
              </button>
            ))}
          </div>
        )}
      </div>
      {isMobile && pageControls}
    </div>
  );
}

function renderProjectContent(projectName, options = {}) {
  const { showTag = true, isMobile = false } = options;

  switch (projectName) {
    case 'Flows':
      return <FlowsProject showTag={showTag} isMobile={isMobile} />;
    case 'Kakimasu':
      return <KakimasuProject showTag={showTag} isMobile={isMobile} />;
    case 'Stack':
      return <StackProject showTag={showTag} isMobile={isMobile} />;
    case 'Voicenotes':
      return <VoicenotesProject showTag={showTag} isMobile={isMobile} />;
    case 'WorkFeed':
      return <WorkFeedProject showTag={showTag} isMobile={isMobile} />;
    case 'Switch UI':
      return <SwitchUIProject showTag={showTag} isMobile={isMobile} />;
    case 'Aurora Retreat':
      return <AuroraRetreatProject showTag={showTag} isMobile={isMobile} />;
    default:
      return (
        <div
          style={{
            alignItems: 'center',
            color: '#C4C4C4',
            display: 'flex',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '18px',
            gap: '8px',
            justifyContent: 'center',
            lineHeight: '140%',
          }}
        >
          <span>{projectName}</span>
          <span style={{ color: '#000000' }}>coming soon</span>
        </div>
      );
  }
}

function MobileProjectFrame({
  title,
  year,
  description,
  coverImage,
  frameImage,
  coverStyle = {},
  frameStyle = {},
  showTag = true,
}) {
  return (
    <div
      style={{
        alignItems: 'center',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        flexDirection: 'column',
        fontSynthesis: 'none',
        gap: 5,
        height: 'fit-content',
        justifyContent: 'start',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        width: '100%',
        maxWidth: '360px',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          flexShrink: '0',
          height: '276px',
          width: '100%',
          maxWidth: '360px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '250px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '12px 13px',
            width: '336px',
            ...coverStyle,
          }}
        />
        <div
          style={{
            backgroundImage: `url(${frameImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '276px',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '100%',
            maxWidth: '360px',
            ...frameStyle,
          }}
        />
      </div>
      <div
        className={`mobile-tagline ${showTag ? 'visible' : ''}`}
        style={{
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: '0',
          height: 'fit-content',
          justifyContent: 'center',
          paddingBlock: '9px',
          width: '100%',
          maxWidth: '360px',
          gap: '6px',
          marginTop: '32px',
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '14px',
            fontVariationSettings:
              '"wght" 500, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 500,
            height: 'fit-content',
            lineHeight: '140%',
            textAlign: 'left',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {title}
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            textAlign: 'left',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {year}
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            textAlign: 'left',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

function FlowsProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="Flows"
        year="2026"
        description={'Product Design,\nWeb development, AI'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXV3CVX9NTXB88Y3K21XW86.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSWRQE7V2HAJS10DNMFAVH.png"
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '639px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          height: '639px',
          width: '834px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXV3CVX9NTXB88Y3K21XW86.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '578px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '28px 31px',
            width: '777px',
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSWRQE7V2HAJS10DNMFAVH.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '639px',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '834px',
          }}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          fontSynthesis: 'none',
          height: 'fit-content',
          justifyContent: 'start',
          left: '50%',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '64px',
          position: 'absolute',
          transform: 'translate(433px, 0)',
          WebkitFontSmoothing: 'antialiased',
          width: 'fit-content',
          bottom: '0',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          2026
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {'Product Design,\nWeb development, AI'}
        </div>
      </div>
    </div>
  );
}

function KakimasuProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="Kakimasu"
        year="2025"
        description={'Product Design,\nResearch, Case Study'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXTP56G76PV37A0A365TXK0.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSN5F8D8968GAT411JQM2T.png"
        coverStyle={{ borderRadius: '18px' }}
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '638px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          height: '638px',
          width: '312px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXTP56G76PV37A0A365TXK0.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '27px',
            boxSizing: 'border-box',
            height: '616px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '13px 12px',
            width: '284px',
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSN5F8D8968GAT411JQM2T.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '638px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '0px 1px',
            width: '311px',
          }}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          fontSynthesis: 'none',
          height: 'fit-content',
          justifyContent: 'start',
          left: '50%',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '64px',
          position: 'absolute',
          transform: 'translate(172px, 0)',
          WebkitFontSmoothing: 'antialiased',
          width: 'fit-content',
          bottom: '0',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          2025
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {'Product Design,\nResearch, Case Study'}
        </div>
      </div>
    </div>
  );
}

function StackProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="Stack"
        year="2024"
        description={'Product Design,\nResearch, Case Study'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXVQ2G3ATX03SYABW92K6N6.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSN5F8D8968GAT411JQM2T.png"
        coverStyle={{ borderRadius: '18px' }}
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '638px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          height: '638px',
          width: '312px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXVQ2G3ATX03SYABW92K6N6.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '27px',
            boxSizing: 'border-box',
            height: '616px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '13px 12px',
            width: '284px',
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSN5F8D8968GAT411JQM2T.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '638px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '0px 1px',
            width: '311px',
          }}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          fontSynthesis: 'none',
          height: 'fit-content',
          justifyContent: 'start',
          left: '50%',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '64px',
          position: 'absolute',
          transform: 'translate(172px, 0)',
          WebkitFontSmoothing: 'antialiased',
          width: 'fit-content',
          bottom: '0',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          2024
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {'Product Design,\nResearch, Case Study'}
        </div>
      </div>
    </div>
  );
}

function VoicenotesProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="Voicenotes"
        year="2024"
        description={'Product Design,\nPlayground, Braindump'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXWGR2XWWMRK4TZFAYC0J1N.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSN5F8D8968GAT411JQM2T.png"
        coverStyle={{ borderRadius: '18px' }}
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '638px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          height: '638px',
          width: '312px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXWGR2XWWMRK4TZFAYC0J1N.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '27px',
            boxSizing: 'border-box',
            height: '616px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '13px 12px',
            width: '284px',
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXSN5F8D8968GAT411JQM2T.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '638px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '0px 1px',
            width: '311px',
          }}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          fontSynthesis: 'none',
          height: 'fit-content',
          justifyContent: 'start',
          left: '50%',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '64px',
          position: 'absolute',
          transform: 'translate(172px, 0)',
          WebkitFontSmoothing: 'antialiased',
          width: 'fit-content',
          bottom: '0',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          2024
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {'Product Design,\nPlayground, Braindump'}
        </div>
      </div>
    </div>
  );
}

function WorkFeedProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="WorkFeed"
        year="2024"
        description={'Product Design,\nPlayground, Braindump'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXQT9GW5CRRPTRV3GPWMX6.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXP7FX3HA23V4M099JJ5CN.png"
        coverStyle={{ translate: '4px 20px', width: '352px', height: '240px' }}
        frameStyle={{ height: '276px', width: '100%', maxWidth: '360px' }}
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '639px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          fontSynthesis: 'none',
          height: '639px',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          width: '1033px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXQT9GW5CRRPTRV3GPWMX6.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '487px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '132px 75px',
            width: '818px',
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXP7FX3HA23V4M099JJ5CN.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '639px',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '1033px',
          }}
        />
        <div
          style={{
            backgroundColor: '#FFFFFF',
            boxSizing: 'border-box',
            height: '495px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '924px 67.5px',
            width: '27px',
          }}
        />
        <div
          style={{
            alignItems: 'start',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'column',
            height: 'fit-content',
            justifyContent: 'start',
            left: '0',
            paddingBlock: '64px',
            position: 'absolute',
            top: '0',
            translate: '938px 460.609px',
            width: 'fit-content',
          }}
          className={`project-tag ${showTag ? 'visible' : ''}`}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#000000',
              flexShrink: '0',
              fontFamily: '"Google Sans Flex", system-ui, sans-serif',
              fontSize: '12px',
              fontVariationSettings:
                '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
              fontWeight: 400,
              height: 'fit-content',
              lineHeight: '140%',
              whiteSpace: 'pre',
              width: 'fit-content',
            }}
          >
            2024
          </div>
          <div
            style={{
              boxSizing: 'border-box',
              color: '#C4C4C4',
              flexShrink: '0',
              fontFamily: '"Google Sans Flex", system-ui, sans-serif',
              fontSize: '12px',
              fontVariationSettings:
                '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
              fontWeight: 400,
              height: 'fit-content',
              lineHeight: '140%',
              whiteSpace: 'pre',
              width: 'fit-content',
            }}
          >
            {'Product Design,\nPlayground, Braindump'}
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchUIProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="Switch UI"
        year="2023"
        description={'Product Design,\nPlayground, Braindump'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXX9AFC1D81ZVT4PZZKV39S.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXB2Z80MJHHM0KZD2S7NRF.png"
        coverStyle={{ height: '240px', width: '352px', translate: '4px 18px' }}
        frameStyle={{ height: '276px', width: '100%', maxWidth: '360px' }}
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignSelf: 'center',
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '350px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          height: '350px',
          width: '823.5px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXX9AFC1D81ZVT4PZZKV39S.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: 350,
            left: '0',
            position: 'absolute',
            top: '0',
            width: 823.5,
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXB2Z80MJHHM0KZD2S7NRF.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '309px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '137px 20px',
            width: '549px',
          }}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          fontSynthesis: 'none',
          height: 'fit-content',
          justifyContent: 'start',
          left: '50%',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '64px',
          position: 'absolute',
          transform: 'translate(432px, 0)',
          WebkitFontSmoothing: 'antialiased',
          width: 'fit-content',
          bottom: '0',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          2023
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {'Product Design,\nPlayground, Braindump'}
        </div>
      </div>
    </div>
  );
}

function AuroraRetreatProject({ showTag, isMobile }) {
  if (isMobile) {
    return (
      <MobileProjectFrame
        title="Aurora Retreat"
        year="2023"
        description={'Product Design,\nPlayground, Braindump'}
        coverImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXY42VG80RBHBYW0SHEX23A.png"
        frameImage="https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXP7FX3HA23V4M099JJ5CN.png"
        coverStyle={{ translate: '4px 18px', width: '352px', height: '240px' }}
        frameStyle={{ height: '276px', width: '100%', maxWidth: '360px' }}
        showTag={showTag}
      />
    );
  }

  return (
    <div
      style={{
        alignItems: 'flex-end',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        height: '639px',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <div
        style={{
          boxSizing: 'border-box',
          contain: 'layout',
          height: '639px',
          width: '1033px',
          position: 'relative',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXY42VG80RBHBYW0SHEX23A.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '484px',
            left: '0',
            position: 'absolute',
            top: '0',
            translate: '132px 82px',
            width: '769px',
          }}
        />
        <div
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXXP7FX3HA23V4M099JJ5CN.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '639px',
            left: '0',
            position: 'absolute',
            top: '0',
            width: '1033px',
          }}
        />
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          fontSynthesis: 'none',
          height: 'fit-content',
          justifyContent: 'start',
          left: '50%',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '64px',
          position: 'absolute',
          transform: 'translate(432px, 0)',
          WebkitFontSmoothing: 'antialiased',
          width: 'fit-content',
          bottom: '0',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          2023
        </div>
        <div
          style={{
            boxSizing: 'border-box',
            color: '#C4C4C4',
            flexShrink: '0',
            fontFamily: '"Google Sans Flex", system-ui, sans-serif',
            fontSize: '12px',
            fontVariationSettings:
              '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
            fontWeight: 400,
            height: 'fit-content',
            lineHeight: '140%',
            whiteSpace: 'pre',
            width: 'fit-content',
          }}
        >
          {'Product Design,\nPlayground, Braindump'}
        </div>
      </div>
    </div>
  );
}
