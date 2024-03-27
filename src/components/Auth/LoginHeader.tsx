import Image from "next/image";

interface Props {
  title: string;
}
const LoginHeader = ({ title }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image src="/images/isoicon.png" alt="iso icon" width={42} height={32} />
      <h2 className="h2 text-center font-medium">Iniciar sesión</h2>
    </div>
  );
};

export default LoginHeader;
