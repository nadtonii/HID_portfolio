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

  useEffect(() => {
    calculateSidePadding();
    centerSelected(selectedIndex);

    const handleResize = () => {
      calculateSidePadding();
      centerSelected(selectedIndex);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedIndex]);

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

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        height: '100dvh',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <nav
        style={{
          alignItems: 'center',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'row',
          fontSynthesis: 'none',
          gap: '16px',
          height: 'fit-content',
          justifyContent: 'start',
          MozOsxFontSmoothing: 'grayscale',
          paddingBlock: '20px',
          paddingInline: '20px',
          WebkitFontSmoothing: 'antialiased',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'start',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexBasis: '0px',
            flexDirection: 'column',
            flexGrow: '1',
            flexShrink: '0',
            height: 'fit-content',
            justifyContent: 'start',
            width: 'auto',
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
          <div
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
                width: '19px',
              }}
            />
          </div>
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXS4XGXBVXT4CK0NG024Y15.svg)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '24px',
              width: '24px',
            }}
          />
        </div>
      </nav>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: '1 1 0%',
          justifyContent: 'center',
          width: '100%',
          paddingInline: '20px',
        }}
      >
        <div
          className="project-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {exitingIndex !== null && (
            <div
              className={`project-frame ${
                transitionDirection === 1 ? 'exit-to-left' : 'exit-to-right'
              }`}
            >
              {renderProjectContent(projects[exitingIndex], { showTag: false })}
            </div>
          )}
          <div
            key={projects[selectedIndex]}
            className={`project-frame ${
              transitionDirection === 1 ? 'enter-from-right' : 'enter-from-left'
            }`}
          >
            {renderProjectContent(projects[selectedIndex], { showTag })}
          </div>
        </div>
      </div>

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
          paddingBlock: '20px 0px',
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
    </div>
  );
}

function renderProjectContent(projectName, options = {}) {
  const { showTag = true } = options;

  switch (projectName) {
    case 'Flows':
      return <FlowsProject showTag={showTag} />;
    case 'Kakimasu':
      return <KakimasuProject showTag={showTag} />;
    case 'Stack':
      return <StackProject showTag={showTag} />;
    case 'Voicenotes':
      return <VoicenotesProject showTag={showTag} />;
    case 'WorkFeed':
      return <WorkFeedProject showTag={showTag} />;
    case 'Switch UI':
      return <SwitchUIProject showTag={showTag} />;
    case 'Aurora Retreat':
      return <AuroraRetreatProject showTag={showTag} />;
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

function FlowsProject({ showTag }) {
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

function KakimasuProject({ showTag }) {
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

function StackProject({ showTag }) {
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

function VoicenotesProject({ showTag }) {
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

function WorkFeedProject({ showTag }) {
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

function SwitchUIProject({ showTag }) {
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

function AuroraRetreatProject({ showTag }) {
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
          color: '#C4C4C4',
          fontFamily: '"Google Sans Flex", system-ui, sans-serif',
          fontSize: '12px',
          fontVariationSettings:
            '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
          fontWeight: 400,
          lineHeight: '140%',
          whiteSpace: 'pre',
        }}
        className={`project-tag ${showTag ? 'visible' : ''}`}
      >
        Aurora Retreat
      </div>
    </div>
  );
}
