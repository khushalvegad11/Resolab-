from django.db import models

class Mfquestions(models.Model):
    question = models.TextField(max_length=1000)
    option_a = models.CharField(max_length=400)
    option_b = models.CharField(max_length=400)
    option_c = models.CharField(max_length=400)
    option_d = models.CharField(max_length=400)
    answer = models.CharField(max_length=400)

    def __str__(self):
        return '%s' % (self.id)
