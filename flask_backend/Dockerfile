FROM python:3.10

ENV PYTHONUNBUFFERED True

RUN pip install --upgrade pip

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . ./

EXPOSE 5000

CMD exec gunicorn -b 0.0.0.0:5000 --workers 3 --threads 8 --timeout 0 backend:app