import { useForm, SubmitHandler } from "react-hook-form";
import Container from "../Container";
import { Contact } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Contact>();

  const contactMutation = useMutation({
    mutationFn: (newContact: Contact) => {
      return axios.post("/api/contacts", newContact);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "There was an issue sending your message.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    },
  });

  const onSubmit: SubmitHandler<Contact> = (data) => {
    contactMutation.mutate(data);
  };

  return (
    <Container>
      <h1 className="text-4xl text-center font-bold mb-4">Contact Us</h1>
      <p className="text-[16px] text-[#737373] text-center dark:font-semibold w-full md:w-2/4 mx-auto">
        Reach out to us for any inquiries related to our books, shipping, or
        your account. We value your experience and look forward to connecting
        with you.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-10 max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              First Name *
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
              {...register("firstName", { required: true, maxLength: 90 })}
            />
            {errors.firstName && (
              <span className="text-red-500 mt-1 text-sm">
                First Name is required
              </span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Last Name *
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
              {...register("lastName", { required: true, maxLength: 90 })}
            />
            {errors.lastName && (
              <span className="text-red-500 mt-1 text-sm">
                Last Name is required
              </span>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
              {...register("email", { required: true, maxLength: 90 })}
            />
            {errors.email && (
              <span className="text-red-500 mt-1 text-sm">
                Email is required
              </span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
              Phone *
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3"
              {...register("phone", { required: true, maxLength: 90 })}
            />
            {errors.phone && (
              <span className="text-red-500 mt-1 text-sm">
                Phone Number is required
              </span>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-gray-700 dark:text-gray-100 text-lg font-semibold mb-2">
            Message *
          </label>
          <textarea
            placeholder="Your Message"
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg w-full p-3 h-32 resize-none"
            {...register("message", { required: true })}
          ></textarea>
          {errors.message && (
            <span className="text-red-500 mt-1 text-sm">
              Message is required
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="rounded-md text-white text-lg px-4 py-[6px] font-medium bg-fuchsia-800 hover:bg-fuchsia-700 dark:bg-transparent dark:border dark:border-gray-300">
            Submit
          </button>
        </div>
      </form>
    </Container>
  );
};

export default ContactUs;
