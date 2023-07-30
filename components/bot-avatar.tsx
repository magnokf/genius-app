import {Avatar, AvatarImage} from "@/components/ui/avatar";


const BotAvatar = () => {
    return (
        <div>
            <Avatar className="h-8 w-8">
                <AvatarImage
                    src="/logo-genius.png"
                    alt="avatar"
                />

            </Avatar>

        </div>
    );
};

export default BotAvatar;