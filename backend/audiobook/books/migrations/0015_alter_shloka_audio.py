# Generated by Django 5.1.4 on 2025-01-07 05:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("books", "0014_alter_shloka_shloka_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shloka",
            name="audio",
            field=models.FileField(blank=True, null=True, upload_to="shlok_audio/"),
        ),
    ]
