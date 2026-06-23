from django.urls import path
from .views import GenerateStudyPlanView, PrioritizeTasksView

urlpatterns = [
    path('generate-plan/', GenerateStudyPlanView.as_view(), name='generate-plan'),
    path('prioritize/', PrioritizeTasksView.as_view(), name='prioritize'),
]