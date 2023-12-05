'use server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})
export const getOpenAiCompletion = async (prompt: string, data: string) => {
	try {
		const customPrompt = `Necesito que me responda basado en los datos que te voy a trasmitir a traves de la prompt: tienes los siguientes datos de la base de datos:
     ${JSON.stringify(data)} y la prompt: '${prompt}'.
    
     Por ejemplo, si te pide 'Muéstrame la cantidad de pantalones del inventario', puedes asumir que el usuario te esta pidiendo información de los productos dentro del arreglo 'products' que se acerquen a la descripción 'Pantalones'.
    Asegúrate de usar los datos que te mande la prompt y que la respuesta sea lo mas breve posible. En caso de no tener la respuesta, 
     solo responde con un 'No hay data disponible con la que pueda responder'.`

		const completion = await openai.chat.completions.create({
			messages: [{ role: 'system', content: customPrompt }],
			model: 'gpt-4',
			temperature: 0.5,
			max_tokens: 1000,
			top_p: 0.5,
			frequency_penalty: 0,
			presence_penalty: 0,
		})

		return completion.choices[0].message?.content
	} catch (error) {
		return 'Ha ocurrido un error'
	}
}
