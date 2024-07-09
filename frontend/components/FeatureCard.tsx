interface CardProps {
    title: string;
    answer: string;
}

export const FeatureCard = ({ title, answer }: CardProps) => {
    return (
        <>
            <div
                className="border max-w-xl dark:border-white border-black pl-2 mt-3 rounded-md pb-24"
            >
                <div className="font-semibold text-purple-500 px-2 pt-3 text-center">
                    {title}
                </div>
                <div className="dark:text-white px-2">
                    {answer}
                </div>
            </div>
        </>
    );
};
