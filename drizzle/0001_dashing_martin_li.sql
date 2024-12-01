CREATE TABLE IF NOT EXISTS "code-editor_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"link_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"language" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"owner_id" integer NOT NULL,
	CONSTRAINT "code-editor_files_link_id_unique" UNIQUE("link_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "code-editor_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"share_limit" integer DEFAULT 5 NOT NULL,
	CONSTRAINT "code-editor_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "code-editor_post";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "code-editor_files" ADD CONSTRAINT "code-editor_files_owner_id_code-editor_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."code-editor_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
