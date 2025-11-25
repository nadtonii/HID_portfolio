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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carouselRef = useRef(null);
  const itemRefs = useRef([]);
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

    carousel.scrollTo({ left: clampedScroll, behavior: 'smooth' });
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
            onClick={() => setSelectedIndex(index)}
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
