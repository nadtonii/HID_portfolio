export default function App() {
  return (
    <div className='[font-synthesis:none] contain-layout flex flex-row justify-start items-center w-full h-fit gap-4 antialiased p-5'>
      <div className='contain-layout flex flex-col justify-start items-start w-auto h-fit shrink-0 grow basis-0'>
        <div className='text-black text-[20px] leading-[140%] whitespace-pre shrink-0 font-["Google_Sans_Flex",system-ui,sans-serif] font-normal [font-variation-settings:"wght"_400,"wdth"_100,"slnt"_0,"GRAD"_0,"ROND"_0] size-fit'>
          Toni Nađ
        </div>
      </div>
      <div className='contain-layout flex flex-row justify-start items-center gap-3 rounded-none shrink-0 p-0 size-fit'>
        <div className='contain-layout flex flex-row justify-center items-center shrink-0 size-6'>
          <div
            className='w-[19px] h-[19px] shrink-0 bg-cover bg-center'
            style={{
              backgroundImage:
                'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXS3K8VTA6TT7AJYZJSDA0F.png)',
            }}
          />
        </div>
        <div
          className='shrink-0 bg-cover bg-center size-6'
          style={{
            backgroundImage:
              'url(https://workers.paper.design/file-assets/01KACA23KJT6YCXQ7Y94ADCZE1/01KAXS4XGXBVXT4CK0NG024Y15.svg)',
          }}
        />
      </div>
    </div>
  );
}
