import InputForm from '@/components/InputForm';

export default function Home() {
  return (
    <h1 className='flex max-w-7xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20'>
        <h1 className='sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900'>
          Generate your cover letter using chatGPT
        </h1>

        <p className='text-slate-500 mt-5'>1098 cover letter generated so far.</p>

        <InputForm />

        <hr className='h-px bg-gray-700 border-1 dark:bg-gray-700' />
      </main>
    </h1>
  );
}
