"use client";
import { useForm } from "react-hook-form";
import CartItem from "./CartItem";
import { useMemo, useState } from "react";
import { createOrder } from "@/action/server/order";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const CheckOut = ({ cartItems = [] }) => {
  const user = useSession();
  console.log(user);
  console.log("user", user?.data?.user?.name);
  const [items, setItems] = useState(cartItems);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );
  const totalAmount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [items],
  );
  const deliveryFee = 80;

  //form data
  const handleFormData = async (data) => {
    console.log(data);
    const result = await createOrder(data);
    if (result.success) {
      reset();
      Swal.fire("success", "Order Successfully created", "success");
    } else {
      Swal.fire("error", "something went wrong", "error");
    }
  };

  return (
    <div>
      {/* title */}
      <div>
        <h2 className="font-bold text-5xl border-l-10 pl-5 py-3 text-primary">
          Checkout
        </h2>
      </div>

      {/* form and chekcout*/}
      <div className="flex gap-4 my-5">
        {/* form */}
        <div className="flex-3 border border-gray-200 rounded p-5">
          <form onSubmit={handleSubmit(handleFormData)} className="space-y-2">
            <div>
              <h3 className="text-xl font-semibold">Billing Address</h3>
            </div>
            {/* Name */}
            <fieldset>
              <legend>Name</legend>
              <input
                type="text"
                value={user?.data?.user?.name || ""}
                disabled
                {...register("name")}
                readOnly
                className="border border-gray-300 rounded  p-2 w-full cursor-not-allowed  "
              />
            </fieldset>

            {/* Email */}
            <fieldset>
              <legend>Email</legend>
              <input
                type="email"
                value={user?.data?.user?.email || ""}
                disabled
                {...register("email")}
                className="border border-gray-300 rounded  p-2 w-full cursor-not-allowed "
              />
            </fieldset>

            {/* Address */}
            <fieldset>
              <legend>Address</legend>
              <input
                type="text"
                placeholder="your address"
                {...register("address", { required: true })}
                className="border border-gray-300 rounded  p-2 w-full "
              />
              {errors.address?.type === "required" && (
                <p className="text-red-500">Address is required</p>
              )}
            </fieldset>

            {/* city */}
            <fieldset>
              <legend>City</legend>
              <input
                type="text"
                placeholder="Your City"
                {...register("city", { required: true })}
                className="border border-gray-300 rounded  p-2 w-full "
              />
              {errors.city?.type === "required" && (
                <p className="text-red-500">City is required</p>
              )}
            </fieldset>

            {/* contact */}
            <fieldset>
              <legend className="font-semibold mb-1">Contact</legend>
              <input
                type="number"
                placeholder="Contact Number"
                {...register("contact", {
                  required: "Contact number is required",
                  maxLength: {
                    value: 11,
                    message: "Maximum 11 digits allowed",
                  },
                  minLength: {
                    value: 10,
                    message: "Minimum 10 digits required",
                  },
                  validate: (value) =>
                    value >= 0 || "Negative values are not allowed",
                })}
                onInput={(e) => {
                  // ১১ ডিজিটের বেশি টাইপ করা আটকাবে
                  if (e.target.value.length > 11) {
                    e.target.value = e.target.value.slice(0, 11);
                  }
                  // নেতিবাচক মান টাইপ করলে তা পজিটিভ করে দেবে
                  if (e.target.value < 0) {
                    e.target.value = Math.abs(e.target.value);
                  }
                }}
                // 'e', '+', '-' ইনপুট দেওয়া বন্ধ করতে
                onKeyDown={(e) =>
                  ["e", "E", "-", "+"].includes(e.key) && e.preventDefault()
                }
                className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-orange-500 outline-none"
              />

              {/* এরর মেসেজ প্রদর্শন */}
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contact.message}
                </p>
              )}
            </fieldset>

            {/* city and zip */}
            <div className="flex gap-4">
              {/* state */}
              <fieldset className="flex-1">
                <legend>State</legend>
                <input
                  type="text"
                  placeholder="State"
                  {...register("state", { required: true })}
                  className="border border-gray-300 rounded  p-2 w-full "
                />
                {errors.state?.type === "required" && (
                  <p className="text-red-500">City is required</p>
                )}
              </fieldset>

              {/* zip */}
              <fieldset className="flex-1">
                <legend>Zip</legend>
                <input
                  type="number"
                  placeholder="Zip code"
                  {...register("zip", {
                    required: "Zip code is required",
                    min: {
                      value: 0,
                      message: "Negative values are not allowed",
                    },
                    maxLength: {
                      value: 6,
                      message: "Maximum 6 digits allowed",
                    },
                    validate: (value) =>
                      (value >= 0 && value.toString().length) <= 6 ||
                      "Invalid Number",
                  })}
                  onInput={(e) => {
                    if (e.target.value.length > 6)
                      e.target.value = e.target.value.slice(0, 6);
                    if (e.target.value < 0) e.target.value = 0;
                  }}
                  className="border border-gray-300 rounded  p-2 w-full "
                />
                {errors.zip?.type === "required" && (
                  <p className="text-red-500">{errors.zip.message}</p>
                )}
              </fieldset>
            </div>

            <input
              type="submit"
              value={"Continue to Checkout"}
              className="btn bg-green-800 text-white w-full mt-3"
            />
          </form>
        </div>

        {/* cart */}
        <div className="flex-2">
          {/* RIGHT SIDE ORDER SUMMARY */}
          <div className="flex-2">
            <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

              {/* Product List */}
              <div className="space-y-4 border-b pb-4">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ${(item.quantity * Number(item.price)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 space-y-2">
                {/* Total Item */}
                <div className="flex justify-between text-gray-600">
                  <span>Total Item</span>
                  <span>{totalItems}</span>
                </div>
                {/* delivery Fee */}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee}</span>
                </div>

                {/* sub-total */}
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{totalAmount.toFixed(2)}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Price</span>
                  <span>${(totalAmount + deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              {/* Confirm Button */}
              {/* <button
                // onClick={onConfirm}
                disabled={!items.length}
                className={`${!items.length && "cursor-not-allowed"} w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:bg-gray-400 `}
              >
                Confirm Order
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
