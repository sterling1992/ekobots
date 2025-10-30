import { useEffect, useState } from "react";

const Nosotros = () => {
	const [content, setContent] = useState(null);

	useEffect(() => {
		loadContent();
	}, []);

	const loadContent = async () => {
		// Simulación de carga desde Supabase
		// const { data } = await supabase
		// 	.from("pages")
		// 	.select("content")
		// 	.eq("slug", "nosotros")
		// 	.single();
		// if (data) {
		// 	setContent(data.content);
		// }
	};

	const title = content?.title || "Nosotros";
	const mainText =
		content?.leadText ||
		"Cerramos brechas existentes en el Pacífico Caucano en temas de acceso y permanencia en la educación superior.";
	const description =
		content?.description ||
		"Fortalecemos habilidades de pensamiento computacional, algorítmico y diferentes habilidades del siglo XXI a niños, niñas y jóvenes. A través de cursos de formación presenciales no formales en STEM.";
	const badge =
		content?.badgeText ||
		"(Science, Technology, Engineering and Mathematics.)";
	const quote =
		content?.quote || "Transformamos vidas, inspiramos mentes";

	return (
		<section id="nosotros" className="w-full bg-gray-50 py-16 px-6 overflow-hidden">


			<div className="max-w-7xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-center -mt-8">
					{/* Texto lado izquierdo */}
					<div className="space-y-6">
						<h2 className="text-5xl font-bold text-gray-900">{title}</h2>
						
						<h3 className="text-2xl font-semibold text-gray-800">
							<span className="font-bold">Cerramos brechas</span> existentes{" "}
							<span className="font-bold">en el Pacífico Caucano</span> en temas de{" "}
							<span className="font-bold">acceso y permanencia</span> en la{" "}
							<span className="font-bold">educación superior.</span>
						</h3>

						<p className="text-gray-700 text-lg leading-relaxed">
							{description}
						</p>

						<div className="inline-block bg-gradient-to-r from-teal-800 to-teal-700 text-white px-8 py-3 rounded-full shadow-lg">
							<span className="font-medium">{badge}</span>
						</div>
					</div>

					{/* Imagen con forma personalizada y cita */}
					<div className="relative flex justify-center lg:justify-end">
						<div className="relative">
							{/* Contenedor con altura reducida */}
							<div className="relative w-[370px] h-[720px]">
								{/* Borde degradado */}
								<div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-yellow-400 p-2 shadow-2xl rounded-t-[175px] rounded-b-[185px]">
									<div className="w-full h-full bg-white rounded-t-[173px] rounded-b-[183px]"></div>
								</div>
								
								{/* Imagen dentro del contenedor */}
								<div className="absolute inset-2 overflow-hidden shadow-2xl rounded-t-[173px] rounded-b-[183px]">
									<img
										src="/2.PNG"
										alt="Participantes EKO - Niños y jóvenes levantando las manos en actividad STEM"
										className="w-full h-full object-cover"
									/>
								</div>
							</div>

							{/* Caja de cita */}
							<div className="absolute bottom-28 -right-8 bg-white rounded-2xl shadow-2xl px-8 py-6 max-w-sm z-10 border border-gray-100">
								<div className="flex items-start gap-2">
									<span className="text-6xl text-teal-700 font-serif leading-none -mt-2">"</span>
									<p className="text-gray-900 font-medium text-xl italic leading-tight pt-2">
										{quote}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Nosotros;