'use server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})
export const getOpenAiCompletion = async (prompt: string, data: string) => {
	try {
		const customPrompt = `Necesito que me responda basado en los datos que te voy a trasmitir a traves de la prompt: tienes los siguientes datos de la base de datos:
     ${data} y la prompt: '${prompt}'.
    
     Recuerda que los datos que te mande la prompt, son datos de la base de datos y el modelos están escritos en ingles, 
     asegúrate traducirlo a español en caso de que lo necesites. Es probable que los nombres de los productos, 
     los nombres de los clientes, los nombres de las facturas, los nombres de los usuarios, 
     los nombres de las sesiones, y otros datos estén escritos en singular, por lo tanto tendrás que asumir que se refiere a ellos. 

     Por ejemplo, si te pide 'Muéstrame la cantidad de pantalones del inventario', puedes asumir que el usuario te esta pidiendo información de los productos dentro del arreglo 'products' que se acerquen a la descripción 'Pantalones'.
     Asegúrate de usar los datos que te mande la prompt.  Asegúrate de usar los datos que te mande la prompt y que la respuesta sea lo mas breve posible. En caso de no tener la respuesta, 
     solo responde con un 'No hay data disponible con la que pueda responder'.`

		const completion = await openai.chat.completions.create({
			messages: [{ role: 'system', content: customPrompt }],
			model: 'gpt-3.5-turbo',
			temperature: 0.5,
			max_tokens: 1000,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		})

		return completion.choices[0].message?.content
	} catch (error) {
		return 'Ha ocurrido un error'
	}
}
