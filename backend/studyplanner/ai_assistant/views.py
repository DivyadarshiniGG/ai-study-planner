from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from groq import Groq

client = Groq(api_key=settings.GROQ_API_KEY)

class GenerateStudyPlanView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        subjects = request.data.get('subjects', '')
        days = request.data.get('days', 7)
        hours = request.data.get('hours_per_day', 4)

        prompt = f"""Create a detailed {days}-day study plan for an MCA student.
Subjects: {subjects}
Available hours per day: {hours}
Format as day-wise plan with specific topics and time slots. Be practical and motivating."""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000,
        )
        return Response({'plan': response.choices[0].message.content})


class PrioritizeTasksView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        tasks = request.data.get('tasks', '')

        prompt = f"""I have these tasks to complete:
{tasks}

Prioritize them from most to least urgent for an MCA student.
Give a brief reason for each priority. Be concise and practical."""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=500,
        )
        return Response({'priorities': response.choices[0].message.content})