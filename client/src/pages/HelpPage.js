import React from "react";

import HemletComponent from "../components/utilities/hemlet";

import Logo from "../images/logo.png";

export default function HelpPage() {
  const seoTitle = "Forgot Password? | EasyCart";
  const seoDescription ="Forgot Password.This s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords=["Business", "EasyCart"];

  return (
    <div>
          <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />

      <div>
        <h2>EasyCart help and support</h2>
        <p>
          The Most Common Questions Allergies If you have a food-related allergy
          that could harm your health, please contact the restaurant before
          making the order. You can find the restaurant’s contact information
          from the restaurant’s info page.This way you can be sure that the
          restaurant knows about your allergy and can prepare the food according
          to your needs. You will also be notified if the restaurant isn’t able
          to prepare the dish and inform you of other options better suited to
          your dietary restrictions. EasyCart is a platform that lists the
          descriptions of the dishes with information provided by the
          restaurants. The restaurants themselves are the best resources for
          answering questions about the exact ingredients used in their food and
          how they prepare their dishes.We are always here to help you to get in
          touch with the restaurant. You can contact us through the in-app chat.
          Delivery takes too long? Common reasons for delayed deliveries are
          rush in the restaurant or rush with EasyCart delivery. We
          automatically adjust our time estimates based on actual times. Some
          items in my order are missing or wrong! Contact our support and we'll
          fix this. Sometimes restaurants or couriers make mistakes. We do
          whatever we can to fix every human error. Payments The app didn't take
          my credits into account? The iOS app has a blue confirmation screen
          which repeats the basic order facts, such as the total sum. We always
          use your credits if the order can use them. Some credits are valid for
          delivery orders only. My order was rejected but you're still keeping
          my money? We have made a "credit charge" from your account which does
          not mean that the money is gone – it unfortunately means that until
          your bank releases the charge, you're not able to use it. The duration
          of the charge depends on your bank, EasyCart tells them to release it
          immediately. Did you charge something from my card when I added it?
          It's a 1,00 € credit charge we use to determine whether your card
          works or not. It's released immediately, which means you do not lose
          any money with this operation. Delivery & Takeaway The courier is
          going in the wrong place! What you see on the map is the actual
          location of the EasyCart courier. Some EasyCart deliveries are
          bundled, which means that your address might not be the first
          destination for the courier. We bundle deliveries only when it makes
          sense, and it is rare that you would have to wait extra time because
          of it. Where is the driver? App says "soon" or "delivered" but it
          isn't here. Estimates are predictions, not exact times. However, you
          can always follow the courier's progress on the map on top of the
          progress time. iOS & Android Apps Are the apps exactly the same? My
          friend's app is a little bit different. The iOS and Android apps are
          both hand-crafted with care and sometimes features become available
          first on one platform, and later on the other. The main functionality
          is almost the same. Contact Support If you didn’t find a suitable
          answer in our FAQ above, please feel free to contact us directly right
          away: Drop us a line at support@EasyCart.com Use the live chat inside
          the EasyCart app on your phone Send us a tweet on Twitter 😊💖🎉 What
          is EasyCart? EasyCart – the mobile interface for getting great food
          All of us eat – two to five times a day. EasyCart is the world’s most
          advanced mobile interface for getting great food with the push of a
          button. EasyCart combines a clean, smooth app with a world-class food
          delivery service and it lets its users order their meal to be
          delivered, have it as takeaway, or to be eaten at the restaurant. Food
          is an experience. EasyCart guarantees it's an excellent one – starting
          from the moment the user picks a restaurant and builds their order to
          getting it delivered to their location. As reliably and fast as
          possible. In 1–2 years, the home screens of our smart devices have one
          icon for getting food. EasyCart is going to be that icon. As EasyCart
          is the world’s most advanced mobile interface for getting great food,
          couriers working with us need to be the best as well. That’s why we
          want you to join us
        </p>
      </div>
    </div>
  );
}
