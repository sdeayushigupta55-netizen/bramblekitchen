<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
  http_response_code(400);
  echo json_encode(["message" => "Invalid JSON"]);
  exit;
}

function clean($v) { return trim(preg_replace("/\s+/", " ", (string)$v)); }

$name   = clean($data["name"] ?? "");
$email  = clean($data["email"] ?? "");
$phone  = clean($data["phone"] ?? "");
$guests = clean($data["guests"] ?? "");
$date   = clean($data["date"] ?? "");
$time   = clean($data["time"] ?? "");
$note   = clean($data["note"] ?? "");

if ($name==="" || $email==="" || $phone==="" || $guests==="" || $date==="" || $time==="") {
  http_response_code(400);
  echo json_encode(["message" => "All required fields must be filled"]);
  exit;
}

// ✅ CHANGE THESE
$restaurantEmail = "bramblekitchenandbar@gmail.com";
$fromEmail = "no-reply@YOURDOMAIN.com";
$restroName = "Bramble Kitchen & Bar";

// Email to Restaurant
$subjectAdmin = "New Table Booking: $name | $date $time";
$adminBody =
"New Booking Details\n\n".
"Name: $name\n".
"Email: $email\n".
"Phone: $phone\n".
"Guests: $guests\n".
"Date: $date\n".
"Time: $time\n".
"Message: $note\n\n".
"Sent from: $restroName website.\n";

$headersAdmin = "From: $fromEmail\r\nReply-To: $email\r\n";
$okAdmin = mail($restaurantEmail, $subjectAdmin, $adminBody, $headersAdmin);

// Email to Customer
$subjectUser = "Booking Received — $restroName";
$userBody =
"Hi $name,\n\n".
"Your booking request has been received.\n\n".
"Date: $date\nTime: $time\nGuests: $guests\n".
($note ? ("Message: $note\n") : "").
"\nWe will confirm shortly.\n\nThanks,\n$restroName\n";

$headersUser = "From: $restaurantEmail\r\n";
$okUser = mail($email, $subjectUser, $userBody, $headersUser);

if ($okAdmin && $okUser) {
  echo json_encode(["message" => "Email sent successfully"]);
} else {
  http_response_code(500);
  echo json_encode(["message" => "Mail failed. Check mail() support or use SMTP (PHPMailer)."]);
}
?>
