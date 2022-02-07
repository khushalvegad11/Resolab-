

from django.db import models

class Industry(models.Model):
    industry_name = models.CharField(unique=True, max_length=120)

    def __str__(self):
        return '%s' % self.industry_name

class ResourceType(models.Model):
    industry = models.ForeignKey(Industry, related_name='types',on_delete=models.CASCADE)
    type_name = models.CharField(max_length=120)

    def __str__(self):
        return '%s' % self.type_name

class ResourceCategory(models.Model):
    resource_type = models.ForeignKey(ResourceType, related_name='categories', on_delete=models.CASCADE)
    category_name = models.CharField(max_length=120)

    def __str__(self):
        return '%s' % self.category_name

class Job(models.Model):
    category = models.ForeignKey(ResourceCategory, related_name='jobs', on_delete=models.CASCADE)
    job_name = models.CharField(max_length=120, unique=True)

    def __str__(self):
        return '%s %s' % (self.job_name, self.id)

class PendingVerifications(models.Model):
    CardType=models.CharField(max_length=120)
    CardId=models.CharField(max_length=12)
    UserNname=models.CharField(max_length=120)
    def __str__(self):
        return '%s' % self.CardId
