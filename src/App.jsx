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
  const TAG_DELAY = 250;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState(null);
  const [transitionDirection, setTransitionDirection] = useState(1);
  const [showTag, setShowTag] = useState(true);
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const tagTimeoutRef = useRef(null);
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

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        height: '811px',
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
        <div className="project-stage">
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
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              boxSizing: 'border-box',
              color: selectedIndex === index ? '#000000' : '#C4C4C4',
              flexShrink: 0,
              fontFamily: '"Google Sans Flex", system-ui, sans-serif',
              fontSize: '16px',
              fontVariationSettings:
                '"wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0, "ROND" 0',
              fontWeight: 400,
              lineHeight: '140%',
              whiteSpace: 'pre',
              width: 'fit-content',
              cursor: 'pointer',
              transition: 'color 150ms ease',
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
