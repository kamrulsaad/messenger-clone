import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div>
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Meta Logo"
        ></Image>
      </div>
      <SignInComponent providers={providers}></SignInComponent>
    </div>
  );
}

export default SignInPage;
