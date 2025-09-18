import { EmailSignupForm } from "@/components/email-signup-form";

export function PublicFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <EmailSignupForm />
          </div>
          <div className="flex flex-col justify-between text-sm text-muted-foreground">
            <div></div>
            <p className="mt-4 md:mt-0">
              &copy; {new Date().getFullYear()} Elsbeth&apos;s Quill. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
