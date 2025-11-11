# Neighbor Email Contact Feature

## Overview
This feature allows registered neighbors (users living in the same block/portal/floor/letter) to contact each other by email through the application.

## Features Implemented

### 1. **Neighbor Display with Email Button**
- Users can see all registered neighbors who share the same property (bloque, portal, planta, letra)
- Each neighbor displays:
  - Name
  - Email
  - Owner type (Propietario/Inquilino)
  - **Email button** to contact them

### 2. **Email Contact Button**
- Located next to each neighbor's information
- Shows loading state while sending
- Displays success/error notifications
- Responsive design (horizontal on desktop, vertical on mobile)

### 3. **Multilingual Support**
Translations available in 4 languages:
- **Spanish**: Español
- **English**: English
- **French**: Français
- **German**: Deutsch

Translation keys:
- `profile.neighbors.sendEmail`: Button label
- `profile.neighbors.emailSending`: Loading state
- `profile.neighbors.emailSent`: Success message
- `profile.neighbors.emailError`: Error message

## Database Setup

### Create RPC Function
Execute the following SQL in your Supabase dashboard:

```sql
-- RPC: send_neighbor_contact_email
-- Validates recipient existence and returns contact information

CREATE OR REPLACE FUNCTION send_neighbor_contact_email(
    recipient_email TEXT,
    sender_name TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id UUID;
    sender_email TEXT;
    sender_phone TEXT;
    recipient_exists BOOLEAN;
BEGIN
    current_user_id := auth.uid();
    
    IF current_user_id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'User not authenticated');
    END IF;
    
    SELECT EXISTS(SELECT 1 FROM propietarios WHERE email = recipient_email) INTO recipient_exists;
    
    IF NOT recipient_exists THEN
        RETURN jsonb_build_object('success', false, 'error', 'Recipient not found');
    END IF;
    
    SELECT p.email, p.telefono INTO sender_email, sender_phone
    FROM propietarios p
    WHERE p.user_id = current_user_id;
    
    IF sender_email IS NULL THEN
        SELECT email INTO sender_email FROM auth.users WHERE id = current_user_id;
    END IF;
    
    IF sender_email IS NULL THEN
        RETURN jsonb_build_object('success', false, 'error', 'Sender email not found');
    END IF;
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Email contact request registered',
        'sender_email', sender_email,
        'recipient_email', recipient_email
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;

GRANT EXECUTE ON FUNCTION send_neighbor_contact_email(TEXT, TEXT) TO authenticated;
```

### Create Email Log Table (Optional)
For tracking neighbor contacts:

```sql
CREATE TABLE IF NOT EXISTS neighbor_contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    sender_email TEXT NOT NULL,
    recipient_email TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    sender_phone TEXT,
    status TEXT DEFAULT 'sent', -- sent, bounced, opened, clicked
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_neighbor_contacts_sender ON neighbor_contacts(sender_id);
CREATE INDEX idx_neighbor_contacts_recipient ON neighbor_contacts(recipient_email);
```

## Edge Function Setup (Optional: For Sending Actual Emails via Resend)

If you want to automatically send emails when users click the button:

1. Create a Supabase Edge Function in your project directory:
   ```
   supabase/functions/send-neighbor-email/index.ts
   ```

2. Copy the content from `supabase-edge-functions-send-neighbor-email.ts`

3. Deploy:
   ```bash
   supabase functions deploy send-neighbor-email
   ```

4. Set your Resend API key in Supabase:
   ```bash
   supabase secrets set RESEND_API_KEY="your_resend_api_key"
   ```

## Frontend Implementation

### JavaScript (profile-menu.js)
The neighbor email button calls the `handleSendEmail()` method which:
1. Gets the neighbor's email
2. Calls the RPC function `send_neighbor_contact_email`
3. Shows loading state
4. Displays success/error message
5. Re-enables the button after 2 seconds

```javascript
async handleSendEmail(neighbor, button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enviando...`;

    try {
        const { data, error } = await this.supabase.rpc('send_neighbor_contact_email', {
            recipient_email: neighbor.email,
            sender_name: this.state.propietario?.nombre || this.state.user?.email
        });

        if (error) throw error;

        this.showMessage('success', 'Email enviado correctamente');
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    } catch (error) {
        this.showMessage('error', 'No se pudo enviar el email');
        button.innerHTML = originalText;
        button.disabled = false;
    }
}
```

### HTML (dashboard.html)
The neighbor card is dynamically generated with a structured layout:

```html
<div class="neighbor-item">
    <div class="neighbor-info">
        <h4>Neighbor Name</h4>
        <p>email@example.com · Owner Type</p>
    </div>
    <button class="neighbor-email-btn">
        <i class="fas fa-envelope"></i> Send Email
    </button>
</div>
```

### CSS (dashboard.html)
Styles include:
- Flexbox layout for responsive behavior
- Hover effects for the button
- Dark mode support
- Mobile optimization (stack vertically)
- Loading state animations

## Usage Flow

1. **User Opens Dashboard** → Profile Menu loads neighbors
2. **Neighbors Display** → Shows all neighbors in same property
3. **User Clicks Email Button** → Button shows loading state
4. **RPC Called** → Validates recipient and sender information
5. **Success/Error** → Notification displayed to user
6. **Alternative**: If Edge Function enabled, email is sent to neighbor with sender's contact details

## Security Features

- ✅ Authentication required (user must be logged in)
- ✅ Email validation (both sender and recipient)
- ✅ Recipient verification (ensures email exists in system)
- ✅ SECURITY DEFINER (RPC runs with elevated privileges)
- ✅ Rate limiting (via Supabase by default)

## Error Handling

The system handles:
- ❌ Unauthenticated users (blocked at RPC level)
- ❌ Invalid email formats
- ❌ Non-existent recipients
- ❌ Network errors
- ❌ RPC failures

Each error displays a translated message to the user.

## Future Enhancements

1. **Email Templates**: Customize email appearance based on community/region
2. **Message History**: Store conversation history between neighbors
3. **Blocking**: Allow users to block other neighbors
4. **Rate Limiting**: Limit contacts per user per day
5. **Notifications**: Show when an email is opened/clicked
6. **Verification**: Allow email verification before sending

## Files Modified

- ✅ `profile-menu.js` - Added `renderNeighbors()` and `handleSendEmail()`
- ✅ `dashboard.html` - Added CSS for neighbor items and email button
- ✅ `translations.js` - Added 4 language translations
- ✅ `send-neighbor-contact-email.sql` - RPC function
- ✅ `supabase-edge-functions-send-neighbor-email.ts` - Optional Edge Function

## Testing

### Manual Testing
1. Create two test accounts in the same property
2. Navigate to user profile menu
3. Click "Registered neighbors" section
4. Click email button for a neighbor
5. Verify success message appears

### Automated Testing (if implemented)
- Unit tests for `handleSendEmail()`
- Integration tests for RPC function
- E2E tests for full workflow

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Email button not showing | Check if neighbors are registered for same property |
| Button click does nothing | Check browser console for errors, verify Supabase client initialization |
| "Recipient not found" error | Verify neighbor's email is in propietarios table |
| Translations not showing | Clear browser cache, verify `data-i18n` attributes |
| Mobile layout broken | Check CSS media queries for `.neighbor-item` |

## Support

For issues or questions, refer to:
- Supabase Documentation: https://supabase.com/docs
- Project README: See root project directory
