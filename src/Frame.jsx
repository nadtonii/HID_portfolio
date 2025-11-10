import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

function DesktopFrame() {
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
          flexShrink: '0',
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
            flexShrink: '0',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            height: 'fit-content',
            letterSpacing: '-0.03em',
            lineHeight: '150%',
            whiteSpace: 'pre',
            width: 'fit-content',
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
            flexShrink: '0',
            gap: '8px',
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#727272',
              flexShrink: '0',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              height: 'fit-content',
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
          flexShrink: '0',
          gap: '12px',
          height: 'fit-content',
          justifyContent: 'start',
          overflowWrap: 'break-word',
          paddingBlock: 0,
          paddingInline: '16px',
          width: '393px',
        }}
      >
        <div
          className="hover-fade"
          style={{
            alignItems: 'center',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: 20,
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N1ZB4MFFA6TKMN731J6HNJ.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '76px',
              width: '76px',
            }}
          />
          <div
            style={{
              alignItems: 'start',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: '0',
              gap: 0,
              height: 'fit-content',
              justifyContent: 'end',
              overflowWrap: 'break-word',
              paddingBlock: 0,
              paddingInline: 0,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              Research papers
            </div>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#908D8C',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              2 research papers
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#DDDDDD',
            boxSizing: 'border-box',
            flexShrink: '0',
            height: '1px',
            width: 'auto',
          }}
        />
        <div
          className="hover-fade"
          style={{
            alignItems: 'center',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: 20,
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N09XFPKWKR03V2F89KC21S.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '76px',
              width: '76px',
            }}
          />
          <div
            style={{
              alignItems: 'start',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: '0',
              gap: 0,
              height: 'fit-content',
              justifyContent: 'end',
              overflowWrap: 'break-word',
              paddingBlock: 0,
              paddingInline: 0,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              Case studies
            </div>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#908D8C',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              2 case studies
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#DDDDDD',
            boxSizing: 'border-box',
            flexShrink: '0',
            height: '1px',
            width: 'auto',
          }}
        />
        <div
          className="hover-fade"
          style={{
            alignItems: 'center',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: 20,
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N23JSJG76YMSNGTK34RM97.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '76px',
              width: '76px',
            }}
          />
          <div
            style={{
              alignItems: 'start',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: '0',
              gap: 0,
              height: 'fit-content',
              justifyContent: 'end',
              overflowWrap: 'break-word',
              paddingBlock: 0,
              paddingInline: 0,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              Playground
            </div>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#908D8C',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              8 designs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFrame() {
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
          flexShrink: '0',
          gap: 0,
          height: 'fit-content',
          justifyContent: 'center',
          overflowWrap: 'break-word',
          paddingBlock: '4px',
          paddingInline: '16px',
          width: 'auto',
        }}
      >
        <div
          style={{
            boxSizing: 'border-box',
            color: '#000000',
            flexShrink: '0',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            height: 'fit-content',
            letterSpacing: '-0.03em',
            lineHeight: '150%',
            whiteSpace: 'pre',
            width: 'fit-content',
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
            flexShrink: '0',
            gap: '8px',
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              color: '#727272',
              flexShrink: '0',
              fontFamily: '"Inter", system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              height: 'fit-content',
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
          flexShrink: '0',
          gap: '12px',
          height: 'fit-content',
          justifyContent: 'start',
          overflowWrap: 'break-word',
          paddingBlock: 0,
          paddingInline: '16px',
          width: 'auto',
        }}
      >
        <div
          className="hover-fade"
          style={{
            alignItems: 'center',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: 20,
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N1ZB4MFFA6TKMN731J6HNJ.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '76px',
              width: '76px',
            }}
          />
          <div
            style={{
              alignItems: 'start',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: '0',
              gap: 0,
              height: 'fit-content',
              justifyContent: 'end',
              overflowWrap: 'break-word',
              paddingBlock: 0,
              paddingInline: 0,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              Research papers
            </div>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#908D8C',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              2 research papers
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#DDDDDD',
            boxSizing: 'border-box',
            flexShrink: '0',
            height: '1px',
            width: 'auto',
          }}
        />
        <div
          className="hover-fade"
          style={{
            alignItems: 'center',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: 20,
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N09XFPKWKR03V2F89KC21S.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '76px',
              width: '76px',
            }}
          />
          <div
            style={{
              alignItems: 'start',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: '0',
              gap: 0,
              height: 'fit-content',
              justifyContent: 'end',
              overflowWrap: 'break-word',
              paddingBlock: 0,
              paddingInline: 0,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              Case studies
            </div>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#908D8C',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              2 case studies
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#DDDDDD',
            boxSizing: 'border-box',
            flexShrink: '0',
            height: '1px',
            width: 'auto',
          }}
        />
        <div
          className="hover-fade"
          style={{
            alignItems: 'center',
            boxSizing: 'border-box',
            contain: 'layout',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: '0',
            gap: 20,
            height: 'fit-content',
            justifyContent: 'start',
            overflowWrap: 'break-word',
            paddingBlock: 0,
            paddingInline: 0,
            width: 'fit-content',
          }}
        >
          <div
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01K9M7AXRCSP41EEZ22CNJ158C/01K9N23JSJG76YMSNGTK34RM97.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              boxSizing: 'border-box',
              flexShrink: '0',
              height: '76px',
              width: '76px',
            }}
          />
          <div
            style={{
              alignItems: 'start',
              boxSizing: 'border-box',
              contain: 'layout',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: '0',
              gap: 0,
              height: 'fit-content',
              justifyContent: 'end',
              overflowWrap: 'break-word',
              paddingBlock: 0,
              paddingInline: 0,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                boxSizing: 'border-box',
                color: '#000000',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              Playground
            </div>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#908D8C',
                flexShrink: '0',
                fontFamily: '"Inter", system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                height: 'fit-content',
                letterSpacing: '-0.03em',
                lineHeight: '150%',
                whiteSpace: 'pre',
                width: 'fit-content',
              }}
            >
              8 designs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Frame() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false,
  );

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

  return isMobile ? <MobileFrame /> : <DesktopFrame />;
}
