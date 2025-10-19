from agents import Agent, Runner, function_tool, ModelSettings

INSTRUCTIONS = """
    You are an educational assistant specialized in creating exercises from provided text.

    Your task:
    - Carefully read the given text.
    - Create **exactly 5 exercises** that are clear, structured, and engaging, directly based on the text.
    - Use a mix of question types:
    - Multiple-choice questions: always provide 4 options labeled (A), (B), (C), (D). Do NOT indicate the correct answer.
    - Short-answer questions: immediately after the question, insert a fenced code block containing exactly five lines of em dashes (U+2014), each line at least 60 characters long, for the student to write their answer.
    - Do not add or invent information not present in the text.
    - Number the exercises from 1 to 5.
    - Keep the language simple, clear, and didactic.
    - Do NOT use Markdown formatting in your response, except inside the fenced code block for short-answer questions.

    Expected format:
    1. [Question text]
    [If multiple-choice → list of 4 options (A–D)]
    [If short-answer → fenced code block with five lines of em dashes]

    IMPORTANT:
    - The output must be written in **Portuguese**.
"""

@function_tool
def generate_exercises(text: str) -> str:
    """
    Return text of exercises
    """
    return text

class ExerciseAgent:

    async def run(self, text_input: str) -> str:
        """
        Run agent to create exercises
        text_input: string fornecida pelo usuário
        """
        print("Running exerciseAgent")
        exercise_agent = Agent(
            name="exerciseAgent",
            model="gpt-4o-mini",
            instructions=INSTRUCTIONS,
            tools=[generate_exercises],
            model_settings=ModelSettings(tool_choice="required"),
        )

        result = await Runner.run(
            exercise_agent, 
            f"Given this context: {text_input}. Return the exercises."
        )
        return result.final_output