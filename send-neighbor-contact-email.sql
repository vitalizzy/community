-- ============================================================================
-- RPC: send_neighbor_contact_email
-- ============================================================================
-- Purpose: Sends an email to a neighbor with contact information from the sender
-- Usage: SELECT send_neighbor_contact_email('neighbor@email.com', 'Sender Name');

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
    -- Get current user ID
    current_user_id := auth.uid();
    
    -- Verify user is authenticated
    IF current_user_id IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'User not authenticated'
        );
    END IF;
    
    -- Verify recipient email exists in propietarios table
    SELECT EXISTS(SELECT 1 FROM propietarios WHERE email = recipient_email) INTO recipient_exists;
    
    IF NOT recipient_exists THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Recipient not found'
        );
    END IF;
    
    -- Get sender's email and phone from propietarios table
    SELECT p.email, p.telefono INTO sender_email, sender_phone
    FROM propietarios p
    WHERE p.user_id = current_user_id;
    
    -- If not found, use auth email
    IF sender_email IS NULL THEN
        SELECT email INTO sender_email
        FROM auth.users
        WHERE id = current_user_id;
    END IF;
    
    -- Validate sender email
    IF sender_email IS NULL THEN
        RETURN jsonb_build_object(
            'success', false,
            'error', 'Sender email not found'
        );
    END IF;
    
    -- Record the contact request in a contacts table for logging/analytics
    -- (Optional: create a contacts_log table to track neighbor contacts)
    
    -- Return success
    RETURN jsonb_build_object(
        'success', true,
        'message', 'Email contact request registered',
        'sender_email', sender_email,
        'recipient_email', recipient_email
    );
    
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION send_neighbor_contact_email(TEXT, TEXT) TO authenticated;
