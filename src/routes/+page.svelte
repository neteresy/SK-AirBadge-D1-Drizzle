<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components"
</script>

<SignOut>
  <div slot="submitButton" class="buttonPrimary">Sign out</div>
</SignOut>

<SignIn>
  <div slot="submitButton" class="buttonPrimary">Sign in</div>
</SignIn>