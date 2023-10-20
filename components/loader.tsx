import Image from 'next/image';


const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin">
                <Image
                    alt="logo"
                    src="/logo-genius.png"
                    fill
                    sizes="100%"
                />

            </div>
            <p className="text-muted-foreground text-sm text-center">
               Assinfo Genius está pensando...
            </p>
        </div>
    );
};

export default Loader;