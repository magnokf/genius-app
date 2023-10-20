"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";

import BotAvatar from "@/components/bot-avatar";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { cn } from "@/lib/utils";

const ConversationPage = () => {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionRequestMessage = {
				role: "user",
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];

			const response = await axios.post("/api/conversation", {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (e) {
			// TODO: Open Pro Modal
			// console.log(e)
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Pergunte e eu te respondo"
				description="Tire suas dúvidas sobre qualquerr coisa."
				icon={MessageSquare}
				iconColor="text-violet-500"
				bgColor="bg-violet-100"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none"
												disabled={isLoading}
												placeholder="Onde posso ...?"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="col-span-12 lg:col-span-2 w-full"
								disabled={isLoading}>
								Enviar
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="Sem conversa iniciada" />
					)}
					<div className="flex flex-col-reverse gap-4">
						{messages.map((message, index) => (
							<div
								key={index}
								className={cn(
									"p-8 w-full flex items-start gap-x-8 rounded-lg",
									message.role === "user"
										? "bg-white border border-black/10"
										: "bg-muted"
								)}>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<p className="text-sm">{message.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationPage;
