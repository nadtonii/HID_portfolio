import Frame from './Frame.jsx';

export default function App() {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100dvh',
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
        width: '100%',
      }}
    >
      <Frame />
    </div>
  );
}
