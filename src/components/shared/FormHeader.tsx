import Image from "next/image";

interface FormHeaderProps {
    formName: string;
}

export function FormHeader({ formName }: FormHeaderProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mb-6 px-4 md:px-0">
            <div className="w-full relative flex justify-center items-center rounded-2xl overflow-hidden">
                <Image
                    src="/images/feedBackImage.png"
                    alt="Feedback Banner"
                    width={1400}
                    height={300}
                    className="w-full object-cover"
                />

                <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2">
                    <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-bold text-[#E31313] leading-tight">
                        Feedback Form
                    </h1>
                    <p className="text-sm sm:text-lg text-[#E31313] font-medium mt-1">
                        {formName}
                    </p>
                </div>
            </div>
        </div>
    );
}
