import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
	return (
		<div>
			<h1>Apresentação</h1>
			<div>
				<Link href={"/sign-in"}>
					<Button>Entrar</Button>
				</Link>
				<Link href={"/sign-up"}>
					<Button>Registrar</Button>
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
