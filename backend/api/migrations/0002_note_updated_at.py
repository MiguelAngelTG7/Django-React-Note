# Generated by Django 5.1.3 on 2024-11-22 01:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='updated_at',
            field=models.DateField(auto_now=True),
        ),
    ]
