FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /resolab-backend

COPY requirements.txt /resolab-backend

RUN pip3 install -r requirements.txt

ADD . /resolab-backend

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

EXPOSE 8000

# entrypoint
# CMD ["python3", "manage.py", "runserver"]

