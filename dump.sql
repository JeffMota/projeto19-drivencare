CREATE TABLE users (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"role" varchar(3) NOT NULL
);



CREATE TABLE "doctorInfos" (
	"userId" integer REFERENCES users(id) NOT NULL UNIQUE,
	"expertise" varchar(100) NOT NULL,
	"local" TEXT NOT NULL
);



CREATE TABLE schedules (
	"id" serial PRIMARY KEY NOT NULL,
	"doctorId" integer NOT NULL,
	"date" DATE NOT NULL,
	"endHour" TEXT NOT NULL DEFAULT '08:00',
	"startHour" TEXT NOT NULL DEFAULT '18:00'
);



CREATE TABLE scheduling (
	"id" serial PRIMARY KEY NOT NULL,
	"shceduleId" integer REFERENCES schedules(id) NOT NULL,
	"patientId" integer REFERENCES users(id) NOT NULL,
	"doctorId" integer REFERENCES "doctorInfos"("userId") NOT NULL,
	"time" TEXT NOT NULL,
	"status" TEXT NOT NULL DEFAULT 'pending'
);


;