# Generated by Django 5.1.4 on 2024-12-31 09:55

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("books", "0013_alter_shloka_shloka_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shloka",
            name="shloka_number",
            field=models.TextField(),
        ),
    ]
