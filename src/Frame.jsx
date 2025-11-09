import { useEffect, useMemo, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

const sections = [
  {
    id: 'research',
    title: 'Research papers',
    subtitle: '2 research papers',
    image:
      'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N1ZB4MFFA6TKMN731J6HNJ.png)',
  },
  {
    id: 'caseStudies',
    title: 'Case studies',
    subtitle: '2 case studies',
    image:
      'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N09XFPKWKR03V2F89KC21S.png)',
  },
  {
    id: 'playground',
    title: 'Playground',
    subtitle: '8 designs',
    image:
      'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N23JSJG76YMSNGTK34RM97.png)',
  },
];

const detailViews = {
  research: {
    title: 'Research papers',
    description:
      'A collection of my most recent research papers. You will be taken to Notion in case you want to read them.',
    heroImage:
      'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N09XFPKWKR03V2F89KC21S.png)',
    entries: ['Kakimasu', 'Stack'],
  },
  caseStudies: {
    title: 'Case studies',
    description:
      'A collection of my most recent case studies. You will be taken to Notion in case you want to read them.',
    heroImage:
      'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N09XFPKWKR03V2F89KC21S.png)',
    entries: ['Kakimasu', 'Stack'],
  },
};

function ListDivider({ isMobile }) {
  return (
    <div
      style={{
        alignSelf: isMobile ? 'stretch' : 'auto',
        backgroundColor: '#DDDDDD',
        boxSizing: 'border-box',
        flexShrink: 0,
        height: '1px',
        width: 'auto',
      }}
    />
  );
}

function SectionButton({ section, onSelect, isInteractive }) {
  return (
    <button
      type="button"
      onClick={() => (isInteractive ? onSelect(section.id) : undefined)}
      style={{
        alignItems: 'center',
        background: 'none',
        border: 'none',
        color: 'inherit',
        cursor: isInteractive ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        padding: 0,
        textAlign: 'left',
        width: 'fit-content',
      }}
    >
      <div
        style={{
          backgroundImage: section.image,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          boxSizing: 'border-box',
          flexShrink: 0,
          height: '76px',
          width: '76px',
        }}
      />
      <div
        style={{
          alignItems: 'start',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          justifyContent: 'end',
        }}
      >
        <div
          style={{
            color: '#000000',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: '150%',
            whiteSpace: 'pre',
          }}
        >
          {section.title}
        </div>
        <div
          style={{
            color: '#908D8C',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: '150%',
            whiteSpace: 'pre',
          }}
        >
          {section.subtitle}
        </div>
      </div>
    </button>
  );
}

function DesktopHome({ onSelect }) {
  return (
    <div
      style={{
        alignItems: 'center',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        flexDirection: 'row',
        fontSynthesis: 'none',
        gap: '16px',
        height: 'fit-content',
        justifyContent: 'center',
        MozOsxFontSmoothing: 'grayscale',
        overflowWrap: 'break-word',
        paddingBlock: 0,
        paddingInline: 0,
        WebkitFontSmoothing: 'antialiased',
        width: 'fit-content',
      }}
    >
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          gap: 0,
          height: 'fit-content',
          justifyContent: 'center',
          overflowWrap: 'break-word',
          paddingBlock: '4px',
          paddingInline: '16px',
          width: 'fit-content',
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: 0,
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: '150%',
            whiteSpace: 'pre',
          }}
        >
          Toni Nađ
        </div>
        <div
          style={{
            alignItems: 'start',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            justifyContent: 'start',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#727272',
              flexShrink: 0,
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: '150%',
              whiteSpace: 'pre-wrap',
              width: '361px',
            }}
          >
            Human Interface Designer.
          </div>
        </div>
      </div>
      <div
        style={{
          alignItems: 'start',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingInline: '16px',
          width: '393px',
        }}
      >
        {sections.map((section, index) => (
          <div key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SectionButton
              section={section}
              onSelect={onSelect}
              isInteractive={section.id !== 'playground'}
            />
            {index < sections.length - 1 && <ListDivider />}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileHome({ onSelect }) {
  return (
    <div
      style={{
        alignItems: 'start',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        flexDirection: 'column',
        fontSynthesis: 'none',
        gap: '32px',
        height: 'fit-content',
        justifyContent: 'start',
        MozOsxFontSmoothing: 'grayscale',
        overflowWrap: 'break-word',
        paddingBlock: 0,
        paddingInline: 0,
        WebkitFontSmoothing: 'antialiased',
        width: '393px',
      }}
    >
      <div
        style={{
          alignItems: 'start',
          alignSelf: 'stretch',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          justifyContent: 'center',
          paddingBlock: '4px',
          paddingInline: '16px',
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: 0,
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: '150%',
            whiteSpace: 'pre',
          }}
        >
          Toni Nađ
        </div>
        <div
          style={{
            alignItems: 'start',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingBlock: 0,
            paddingInline: 0,
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#727272',
              flexShrink: 0,
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: '150%',
              whiteSpace: 'pre-wrap',
              width: '361px',
            }}
          >
            Human Interface Designer.
          </div>
        </div>
      </div>
      <div
        style={{
          alignItems: 'start',
          alignSelf: 'stretch',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingInline: '16px',
        }}
      >
        {sections.map((section, index) => (
          <div key={section.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SectionButton
              section={section}
              onSelect={onSelect}
              isInteractive={section.id !== 'playground'}
            />
            {index < sections.length - 1 && <ListDivider isMobile />}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailEntries({ entries }) {
  return (
    <div
      style={{
        alignItems: 'start',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'end',
        width: 'fit-content',
      }}
    >
      {entries.map((entry) => (
        <div
          key={entry}
          style={{
            alignItems: 'start',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            paddingBlock: '4px',
            width: 'fit-content',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#000000',
              flexShrink: 0,
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: '150%',
              whiteSpace: 'pre',
            }}
          >
            {entry}
          </div>
          {entry !== entries[entries.length - 1] && (
            <div
              style={{
                backgroundColor: '#DDDDDD',
                boxSizing: 'border-box',
                flexShrink: 0,
                height: '1px',
                marginTop: '4px',
                width: '361px',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BackButton({ onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label="Go back"
      style={{
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        border: 'none',
        borderRadius: 'calc(infinity * 1px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
      }}
    >
      <div
        style={{
          backgroundImage:
            'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N0YEA73TM8CGAH5FDF4G8B.svg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          boxSizing: 'border-box',
          height: '24px',
          width: '24px',
        }}
      />
    </button>
  );
}

function DesktopDetail({ detail, onBack }) {
  return (
    <div
      style={{
        alignItems: 'start',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        flexDirection: 'column',
        fontSynthesis: 'none',
        gap: 22,
        height: 'fit-content',
        justifyContent: 'start',
        MozOsxFontSmoothing: 'grayscale',
        overflowWrap: 'break-word',
        paddingBlock: 0,
        paddingInline: 0,
        WebkitFontSmoothing: 'antialiased',
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
          gap: 0,
          justifyContent: 'start',
          paddingBlock: '4px',
          paddingInline: '16px',
          width: '393px',
        }}
      >
        <BackButton onBack={onBack} />
      </div>
      <div
        style={{
          alignItems: 'center',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          justifyContent: 'start',
          paddingBlock: 0,
          paddingInline: 0,
          width: '851px',
        }}
      >
        <div
          style={{
            backgroundImage: detail.heroImage,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            flex: '1 0 0px',
            height: '393px',
            width: 'auto',
          }}
        />
        <div
          style={{
            alignItems: 'start',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flex: '1 0 0px',
            flexDirection: 'column',
            gap: '32px',
            justifyContent: 'center',
            paddingInline: '16px',
          }}
        >
          <div
            style={{
              alignItems: 'start',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              justifyContent: 'end',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: 0,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '24px',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
              }}
            >
              {detail.title}
            </div>
            <div
              style={{
                alignSelf: 'stretch',
                boxSizing: 'border-box',
                color: '#727272',
                flexShrink: 0,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre-wrap',
              }}
            >
              {detail.description}
            </div>
          </div>
          <DetailEntries entries={detail.entries} />
        </div>
      </div>
    </div>
  );
}

function MobileDetail({ detail, onBack }) {
  return (
    <div
      style={{
        alignItems: 'start',
        boxSizing: 'border-box',
        contain: 'layout',
        display: 'flex',
        flexDirection: 'column',
        fontSynthesis: 'none',
        gap: 0,
        height: 'fit-content',
        justifyContent: 'start',
        MozOsxFontSmoothing: 'grayscale',
        overflowWrap: 'break-word',
        paddingBlock: 0,
        paddingInline: 0,
        WebkitFontSmoothing: 'antialiased',
        width: '393px',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          alignSelf: 'stretch',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'row',
          gap: 0,
          justifyContent: 'start',
          paddingBlock: '4px',
          paddingInline: '16px',
        }}
      >
        <BackButton onBack={onBack} />
      </div>
      <div
        style={{
          alignItems: 'start',
          alignSelf: 'stretch',
          boxSizing: 'border-box',
          contain: 'layout',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          justifyContent: 'start',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            backgroundImage: detail.heroImage,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            height: '393px',
          }}
        />
        <div
          style={{
            alignItems: 'start',
            alignSelf: 'stretch',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            justifyContent: 'center',
            paddingInline: '16px',
          }}
        >
          <div
            style={{
              alignItems: 'start',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              justifyContent: 'end',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: 0,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '24px',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
              }}
            >
              {detail.title}
            </div>
            <div
              style={{
                alignSelf: 'stretch',
                boxSizing: 'border-box',
                color: '#727272',
                flexShrink: 0,
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre-wrap',
              }}
            >
              {detail.description}
            </div>
          </div>
          <DetailEntries entries={detail.entries} />
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false,
  );
  const [activeView, setActiveView] = useState('home');
  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setTransitionKey((key) => key + 1);
  }, [activeView, isMobile]);

  const detail = useMemo(() => detailViews[activeView], [activeView]);

  let content;
  if (activeView === 'home') {
    content = isMobile ? <MobileHome onSelect={setActiveView} /> : <DesktopHome onSelect={setActiveView} />;
  } else if (detail) {
    const detailProps = { detail, onBack: () => setActiveView('home') };
    content = isMobile ? <MobileDetail {...detailProps} /> : <DesktopDetail {...detailProps} />;
  } else {
    content = isMobile ? <MobileHome onSelect={setActiveView} /> : <DesktopHome onSelect={setActiveView} />;
  }

  return (
    <div key={`${transitionKey}-${isMobile}`} className="view-transition">
      {content}
    </div>
  );
}
